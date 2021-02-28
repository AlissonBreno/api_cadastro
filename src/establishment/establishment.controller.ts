import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EstablishmentEntity } from './entities/establishment.entity';
import { EstablishmentService } from './establishment.service';
import {
  ChangeStatusEstablihsmentDto,
  EstablishmentsDto,
} from './dto/establishments-input.dto';

@Controller('establishment')
export class EstablishmentController {
  constructor(private establishmentService: EstablishmentService) {}

  @Get('/list')
  async getEstablishments(): Promise<EstablishmentEntity[]> {
    return await this.establishmentService.getEstablishments();
  }

  @Get(':id')
  async getEstablishment(@Param('id') id: number) {
    return await this.establishmentService.getEstablishment(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createEstablishments(
    @Body() params: EstablishmentsDto
  ): Promise<EstablishmentEntity> {
    return await this.establishmentService.createEstablishments(params);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async updateEstablishments(
    @Param('id') id: number,
    @Body() params: EstablishmentsDto
  ): Promise<EstablishmentEntity> {
    return await this.establishmentService.updateEstablishments(id, params);
  }

  @Patch('/status/:id')
  @UsePipes(ValidationPipe)
  async changeStatusEstablishment(
    @Param('id') id: number,
    @Body() params: ChangeStatusEstablihsmentDto
  ): Promise<EstablishmentEntity> {
    return await this.establishmentService.changeStatusEstablishment(
      id,
      params
    );
  }

  @Delete('/:id')
  async deleteEstablishments(@Param('id') id: number): Promise<void> {
    return await this.establishmentService.deleteEstablishments(id);
  }
}
