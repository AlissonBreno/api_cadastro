import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { EstablishmentEntity } from './establishment.entity';
import { EstablishmentsInput } from './types/create-establishments-input.types';

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
    params: EstablishmentsInput
  ): Promise<EstablishmentEntity> {
    return new EstablishmentEntity();
  }

  async updateEstablishments(
    params: EstablishmentsInput
  ): Promise<EstablishmentEntity> {
    return new EstablishmentEntity();
  }

  async deleteEstablishments(id: number): Promise<void> {
    return;
  }
}
