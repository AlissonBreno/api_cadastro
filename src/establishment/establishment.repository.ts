import { EstablishmentEntity } from './establishment.entity';
import { EstablishmentsInput } from './types/create-establishments-input.types';

export class EstablishmentRepository {
  async getEstablishments(): Promise<EstablishmentEntity[]> {
    return [new EstablishmentEntity()];
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
