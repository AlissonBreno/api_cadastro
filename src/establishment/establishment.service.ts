import { Injectable } from '@nestjs/common';
import { EstablishmentEntity } from './establishment.entity';
import { EstablishmentRepository } from './establishment.repository';
import {
  EstablishmentsDto,
  updateEstablishmentsDto,
} from './dto/establishments-input.dto';

@Injectable()
export class EstablishmentService {
  constructor(private establishmentRepository: EstablishmentRepository) {}
  async getEstablishments(): Promise<EstablishmentEntity[]> {
    return await this.establishmentRepository.getEstablishments();
  }

  async createEstablishments(
    params: EstablishmentsDto
  ): Promise<EstablishmentEntity> {
    return await this.establishmentRepository.createEstablishments(params);
  }

  async updateEstablishments(params: updateEstablishmentsDto) {
    return await this.establishmentRepository.updateEstablishments(params);
  }

  async deleteEstablishments(id: number) {
    return await this.establishmentRepository.deleteEstablishments(id);
  }
}
