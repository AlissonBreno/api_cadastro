import { Module } from '@nestjs/common';
import { EstablishmentService } from './establishment.service';
import { EstablishmentController } from './establishment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablishmentRepository } from './establishment.repository';
import { EstablishmentEntity } from './entities/establishment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EstablishmentEntity, EstablishmentRepository]),
  ],
  providers: [EstablishmentService],
  controllers: [EstablishmentController],
})
export class EstablishmentModule {}
