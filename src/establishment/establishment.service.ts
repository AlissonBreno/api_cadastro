import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EstablishmentsInput } from './types/create-establishments-input.types';

export class EstablishmentEntity {
  razao_social: string;
  nome_fantasia: string;
  cnpj: string;
  email: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  agencia: string;
  conta: string;
  categoria: number;
  status: boolean;
}

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

@Injectable()
export class EstablishmentService {
  constructor(private establishmentRepository: EstablishmentRepository) {}
  async getEstablishments(): Promise<EstablishmentEntity[]> {
    return await this.establishmentRepository.getEstablishments();
  }

  async createEstablishments(params: EstablishmentsInput) {
    return await this.establishmentRepository.createEstablishments(params);
  }

  async updateEstablishments(params: EstablishmentsInput) {
    return await this.establishmentRepository.updateEstablishments(params);
  }

  async deleteEstablishments(id: number) {
    return await this.establishmentRepository.deleteEstablishments(id);
  }
}
