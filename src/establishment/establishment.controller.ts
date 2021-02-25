import { Body, Controller, Get, Post } from '@nestjs/common';
import { EstablishmentEntity } from './establishment.entity';
import { EstablishmentService } from './establishment.service';
import { EstablishmentsDto } from './dto/establishments-input.dto';

@Controller('establishment')
export class EstablishmentController {
  constructor(private establishmentService: EstablishmentService) {}

  @Get('/list')
  async getEstablishments(): Promise<EstablishmentEntity[]> {
    return await this.establishmentService.getEstablishments();
  }
}
