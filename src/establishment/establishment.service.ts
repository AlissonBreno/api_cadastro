import { Injectable, InternalServerErrorException } from '@nestjs/common';

export class EstablishmentRepository {
  async getEstablishments(): Promise<any> {
    //
  }
}

@Injectable()
export class EstablishmentService {
  constructor(private establishmentRepository: EstablishmentRepository) {}
  async getEstablishments(): Promise<any> {
    return await this.establishmentRepository.getEstablishments();
  }
}
