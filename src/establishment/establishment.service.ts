import { Injectable } from '@nestjs/common';
import { EstablishmentEntity } from './entities/establishment.entity';
import { EstablishmentRepository } from './establishment.repository';
import { EstablishmentsDto } from './dto/establishments-input.dto';
import { CategoryService } from '../category/category.service';

@Injectable()
export class EstablishmentService {
  constructor(
    private establishmentRepository: EstablishmentRepository,
    private categoryService: CategoryService
  ) {}
  async getEstablishments(): Promise<EstablishmentEntity[]> {
    return await this.establishmentRepository.getEstablishments();
  }

  async createEstablishments(
    params: EstablishmentsDto
  ): Promise<EstablishmentEntity> {
    const category = await this.categoryService.getCategory(params.categoria);
    return await this.establishmentRepository.createEstablishments(
      params,
      category
    );
  }

  async updateEstablishments(id: number, params: EstablishmentsDto) {
    const category = await this.categoryService.getCategory(params.categoria);
    return await this.establishmentRepository.updateEstablishments(
      id,
      params,
      category
    );
  }

  async deleteEstablishments(id: number) {
    return await this.establishmentRepository.deleteEstablishments(id);
  }
}
