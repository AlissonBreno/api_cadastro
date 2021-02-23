import { Module } from '@nestjs/common';
import { EstablishmentService } from './establishment.service';

@Module({
  providers: [EstablishmentService]
})
export class EstablishmentModule {}
