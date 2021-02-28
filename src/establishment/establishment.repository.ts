import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import { EstablishmentEntity } from './entities/establishment.entity';
import {
  ChangeStatusEstablihsmentDto,
  EstablishmentsDto,
} from './dto/establishments-input.dto';
import { CategoryRepository } from '../category/category.repository';
import { CategoryEntity } from '../category/entities/category.entity';
import { addMaskCnpj } from '../shared/helpers/cnpj.helper';
import { addMaskAgencia } from '../shared/helpers/agencia.helper';
import { removeMask } from '../shared/helpers/string.helper';
import { addMaskConta } from '../shared/helpers/conta.helper';
import { addMaskTelefone } from '../shared/helpers/telefone.helper';
import { br2dbDataFormat } from '../shared/helpers/data.helper';

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
      item.cnpj = addMaskCnpj(item.cnpj);
      item.agencia = addMaskAgencia(item.agencia);
      item.conta = addMaskConta(item.conta);
    });

    return result;
  }

  async getEstablishment(id: number): Promise<EstablishmentEntity> {
    const response = await this.findOne({
      where: {
        id_estabelecimento: id,
      },
      loadEagerRelations: true,
      relations: ['categoria'],
    });

    if (!response) {
      throw new InternalServerErrorException();
    }

    return response;
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
    createEstablishment.telefone = removeMask(params.telefone);
    createEstablishment.endereco = params.endereco;
    createEstablishment.cidade = params.cidade;
    createEstablishment.estado = params.estado;
    createEstablishment.agencia = removeMask(params.agencia);
    createEstablishment.conta = removeMask(params.conta);
    createEstablishment.data_cadastro = br2dbDataFormat(params.data_cadastro);
    createEstablishment.categoria = category;

    createEstablishment.status = params.status;

    try {
      await validateOrReject(createEstablishment);
      await this.save(createEstablishment);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    createEstablishment.cnpj = params.cnpj;
    createEstablishment.telefone = addMaskTelefone(params.telefone);
    createEstablishment.agencia = addMaskAgencia(params.agencia);
    createEstablishment.conta = addMaskConta(params.conta);
    return createEstablishment;
  }

  async updateEstablishments(
    id: number,
    params: EstablishmentsDto,
    category: CategoryEntity
  ): Promise<EstablishmentEntity> {
    const establishment = await this.findOne(id);

    console.log(removeMask(params.cnpj));

    const updateFormated = new EstablishmentEntity();
    updateFormated.razao_social = params.razao_social;
    updateFormated.nome_fantasia = params.nome_fantasia;
    updateFormated.cnpj = removeMask(params.cnpj);
    updateFormated.email = params.email;
    updateFormated.telefone = removeMask(params.telefone);
    updateFormated.endereco = params.endereco;
    updateFormated.cidade = params.cidade;
    updateFormated.estado = params.estado;
    updateFormated.agencia = removeMask(params.agencia);
    updateFormated.conta = removeMask(params.conta);
    updateFormated.data_cadastro = br2dbDataFormat(params.data_cadastro);
    updateFormated.categoria = category;
    updateFormated.status = params.status;

    if (!establishment) {
      throw new NotFoundException(`The establishment was not found.`);
    }

    await this.update({ id_estabelecimento: id }, updateFormated);

    const response = await this.findOne({
      where: { id_estabelecimento: id },
      loadEagerRelations: true,
      relations: ['categoria'],
    });

    response.cnpj = addMaskCnpj(response.cnpj);
    response.telefone = addMaskTelefone(params.telefone);
    response.agencia = addMaskAgencia(response.agencia);
    response.conta = addMaskConta(response.conta);

    return response;
  }

  async changeStatusEstablishment(
    id: number,
    params: ChangeStatusEstablihsmentDto
  ): Promise<EstablishmentEntity> {
    const establishment = await this.findOne(id);

    const updateFormated = new EstablishmentEntity();
    updateFormated.status = params.status;

    if (!establishment) {
      throw new NotFoundException(`The establishment was not found.`);
    }

    await this.update({ id_estabelecimento: id }, updateFormated);

    const response = await this.findOne({
      where: { id_estabelecimento: id },
      loadEagerRelations: true,
      relations: ['categoria'],
    });

    response.cnpj = addMaskCnpj(response.cnpj);
    response.telefone = addMaskTelefone(response.telefone);
    response.agencia = addMaskAgencia(response.agencia);
    response.conta = addMaskConta(response.conta);

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
