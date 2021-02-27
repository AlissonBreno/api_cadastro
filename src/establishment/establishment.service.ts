import { BadRequestException, Injectable } from '@nestjs/common';
import { EstablishmentEntity } from './entities/establishment.entity';
import { EstablishmentRepository } from './establishment.repository';
import { EstablishmentsDto } from './dto/establishments-input.dto';
import { CategoryService } from '../category/category.service';
import { addMaskCnpj, validateCnpj } from '../shared/helpers/cnpj.helper';
import { addMaskTelefone } from '../shared/helpers/telefone.helper';
import { addMaskAgencia } from '../shared/helpers/agencia.helper';
import { addMaskConta } from '../shared/helpers/conta.helper';
import { db2brDataFormat } from '../shared/helpers/data.helper';
import { EstablishmentResponse } from './dto/establishments-response.dto';

@Injectable()
export class EstablishmentService {
  constructor(
    private establishmentRepository: EstablishmentRepository,
    private categoryService: CategoryService
  ) {}
  async getEstablishments(): Promise<EstablishmentEntity[]> {
    return await this.establishmentRepository.getEstablishments();
  }

  async getEstablishment(id: number): Promise<EstablishmentResponse> {
    const establishment = await this.establishmentRepository.getEstablishment(
      id
    );

    return {
      id_estabelecimento: establishment.id_estabelecimento,
      razao_social: establishment.razao_social,
      nome_fantasia: establishment.nome_fantasia,
      cnpj: addMaskCnpj(establishment.cnpj),
      email: establishment.email,
      telefone: addMaskTelefone(establishment.telefone),
      endereco: establishment.endereco,
      cidade: establishment.cidade,
      estado: establishment.estado,
      agencia: addMaskAgencia(establishment.agencia),
      conta: addMaskConta(establishment.conta),
      categoria: establishment.categoria.id_categoria,
      status: establishment.status,
      data_cadastro: db2brDataFormat(establishment.data_cadastro),
    };
  }

  async createEstablishments(
    params: EstablishmentsDto
  ): Promise<EstablishmentEntity> {
    const { cnpj } = params;

    if (!validateCnpj(cnpj)) {
      throw new BadRequestException('cnpj must be valid.');
    }

    const category = await this.categoryService.getCategory(params.categoria);
    return await this.establishmentRepository.createEstablishments(
      params,
      category
    );
  }

  async updateEstablishments(id: number, params: EstablishmentsDto) {
    const { cnpj } = params;

    if (!validateCnpj(cnpj)) {
      throw new BadRequestException('cnpj must be valid.');
    }

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
