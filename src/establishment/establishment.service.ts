import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEstablishmentsInput } from './types/create-establishments-input.types';

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
}

export class EstablishmentRepository {
  async getEstablishments(): Promise<EstablishmentEntity[]> {
    return [new EstablishmentEntity()];
  }

  async createEstablishments(
    params: CreateEstablishmentsInput
  ): Promise<EstablishmentEntity> {
    return new EstablishmentEntity();
  }
}

@Injectable()
export class EstablishmentService {
  constructor(private establishmentRepository: EstablishmentRepository) {}
  async getEstablishments(): Promise<EstablishmentEntity[]> {
    return await this.establishmentRepository.getEstablishments();
  }

  async createEstablishments(params: CreateEstablishmentsInput) {
    return await this.establishmentRepository.createEstablishments(params);
  }
}
