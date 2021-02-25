import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  Post,
} from '@nestjs/common';
import { EstablishmentEntity } from './establishment.entity';
import { EstablishmentService } from './establishment.service';
import {
  EstablishmentsDto,
  updateEstablishmentsDto,
} from './dto/establishments-input.dto';

@Controller('establishment')
export class EstablishmentController {
  constructor(private establishmentService: EstablishmentService) {}

  @Get('/list')
  async getEstablishments(): Promise<EstablishmentEntity[]> {
    return await this.establishmentService.getEstablishments();
  }

  @Post()
  async createEstablishments(
    @Body() params: EstablishmentsDto
  ): Promise<EstablishmentEntity> {
    return await this.establishmentService.createEstablishments(params);
  }

  @Patch()
  async updateEstablishments(
    @Body() params: updateEstablishmentsDto
  ): Promise<any> {
    return await this.establishmentService.updateEstablishments(params);
  }
}
