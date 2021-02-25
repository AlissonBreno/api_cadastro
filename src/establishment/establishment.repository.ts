import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import { EstablishmentEntity } from './entities/establishment.entity';
import {
  EstablishmentsDto,
  updateEstablishmentsDto,
} from './dto/establishments-input.dto';

@EntityRepository(EstablishmentEntity)
export class EstablishmentRepository extends Repository<EstablishmentEntity> {
  async getEstablishments(): Promise<EstablishmentEntity[]> {
    const result = await this.find();

    if (!result) {
      throw new InternalServerErrorException();
    }

    return result;
  }

  async createEstablishments(
    params: EstablishmentsDto
  ): Promise<EstablishmentEntity> {
    const createEstablishment = new EstablishmentEntity();
    createEstablishment.razao_social = params.razao_social;
    createEstablishment.nome_fantasia = params.nome_fantasia;
    createEstablishment.cnpj = params.cnpj;
    createEstablishment.email = params.email;
    createEstablishment.telefone = params.telefone;
    createEstablishment.endereco = params.endereco;
    createEstablishment.cidade = params.cidade;
    createEstablishment.estado = params.estado;
    createEstablishment.agencia = params.agencia;
    createEstablishment.conta = params.conta;
    createEstablishment.categoria = params.categoria;
    createEstablishment.status = params.status;

    try {
      await validateOrReject(createEstablishment);
      await this.save(createEstablishment);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return createEstablishment;
  }

  async updateEstablishments(
    params: updateEstablishmentsDto
  ): Promise<EstablishmentEntity> {
    const establishment = await this.findOne(params.id);

    if (!establishment) {
      throw new NotFoundException(`The establishment was not found.`);
    }

    await this.update({ id: params.id }, params.establishment);

    return await this.findOne(params.id);
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
