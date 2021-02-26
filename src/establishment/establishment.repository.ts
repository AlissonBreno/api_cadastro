import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import { EstablishmentEntity } from './entities/establishment.entity';
import { EstablishmentsDto } from './dto/establishments-input.dto';
import { CategoryRepository } from '../category/category.repository';
import { CategoryEntity } from '../category/entities/category.entity';
import { addMask, removeMask } from '../shared/helpers/cnpj.helper';

@EntityRepository(EstablishmentEntity)
export class EstablishmentRepository extends Repository<EstablishmentEntity> {
  constructor(private categoryRepository: CategoryRepository) {
    super();
  }

  async getEstablishments(): Promise<EstablishmentEntity[]> {
    const result = await this.find({
      loadEagerRelations: true,
      relations: ['categoria'],
    });

    if (!result) {
      throw new InternalServerErrorException();
    }

    result.forEach((item) => {
      item.cnpj = addMask(item.cnpj);
    });

    return result;
  }

  async createEstablishments(
    params: EstablishmentsDto,
    category: CategoryEntity
  ): Promise<EstablishmentEntity> {
    const createEstablishment = new EstablishmentEntity();
    createEstablishment.razao_social = params.razao_social;
    createEstablishment.nome_fantasia = params.nome_fantasia;
    createEstablishment.cnpj = removeMask(params.cnpj);
    createEstablishment.email = params.email;
    createEstablishment.telefone = params.telefone;
    createEstablishment.endereco = params.endereco;
    createEstablishment.cidade = params.cidade;
    createEstablishment.estado = params.estado;
    createEstablishment.agencia = params.agencia;
    createEstablishment.conta = params.conta;
    createEstablishment.data_cadastro = params.data_cadastro;
    createEstablishment.categoria = category;

    createEstablishment.status = params.status;

    try {
      await validateOrReject(createEstablishment);
      await this.save(createEstablishment);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    createEstablishment.cnpj = params.cnpj;
    return createEstablishment;
  }

  async updateEstablishments(
    id: number,
    params: EstablishmentsDto,
    category: CategoryEntity
  ): Promise<EstablishmentEntity> {
    const establishment = await this.findOne(id);

    const createEstablishment = new EstablishmentEntity();
    createEstablishment.razao_social = params.razao_social;
    createEstablishment.nome_fantasia = params.nome_fantasia;
    createEstablishment.cnpj = removeMask(params.cnpj);
    createEstablishment.email = params.email;
    createEstablishment.telefone = params.telefone;
    createEstablishment.endereco = params.endereco;
    createEstablishment.cidade = params.cidade;
    createEstablishment.estado = params.estado;
    createEstablishment.agencia = params.agencia;
    createEstablishment.conta = params.conta;
    createEstablishment.data_cadastro = params.data_cadastro;
    createEstablishment.categoria = category;
    createEstablishment.status = params.status;

    if (!establishment) {
      throw new NotFoundException(`The establishment was not found.`);
    }

    await this.update({ id_estabelecimento: id }, createEstablishment);

    const response = await this.findOne({
      where: { id_estabelecimento: id },
      loadEagerRelations: true,
      relations: ['categoria'],
    });

    response.cnpj = addMask(response.cnpj);

    return response;
  }

  async deleteEstablishments(id: number): Promise<void> {
    const establishment = await this.findOne(id);

    if (!establishment) {
      throw new NotFoundException(`The establishment was not found.`);
    }

    try {
      await this.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
