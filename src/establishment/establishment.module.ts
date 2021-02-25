import { Module } from '@nestjs/common';
import { EstablishmentService } from './establishment.service';
import { EstablishmentController } from './establishment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablishmentRepository } from './establishment.repository';
import { EstablishmentEntity } from './entities/establishment.entity';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EstablishmentEntity, EstablishmentRepository]),
    CategoryModule,
  ],
  providers: [EstablishmentService],
  controllers: [EstablishmentController],
})
export class EstablishmentModule {}
