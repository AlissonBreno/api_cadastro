import { Injectable } from '@nestjs/common';
import { EstablishmentEntity } from './establishment.entity';
import { EstablishmentRepository } from './establishment.repository';
import {
  EstablishmentsInput,
  updateEstablishmentsInput,
} from './types/create-establishments-input.types';

@Injectable()
export class EstablishmentService {
  constructor(private establishmentRepository: EstablishmentRepository) {}
  async getEstablishments(): Promise<EstablishmentEntity[]> {
    return await this.establishmentRepository.getEstablishments();
  }

  async createEstablishments(params: EstablishmentsInput) {
    return await this.establishmentRepository.createEstablishments(params);
  }

  async updateEstablishments(params: updateEstablishmentsInput) {
    return await this.establishmentRepository.updateEstablishments(params);
  }

  async deleteEstablishments(id: number) {
    return await this.establishmentRepository.deleteEstablishments(id);
  }
}
