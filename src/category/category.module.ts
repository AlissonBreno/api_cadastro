import { forwardRef, Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryEntity } from './entities/category.entity';
import { CategoryRepository } from './category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablishmentModule } from 'src/establishment/establishment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, CategoryRepository]),
    forwardRef(() => EstablishmentModule),
  ],
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
