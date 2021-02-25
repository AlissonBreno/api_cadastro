import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryEntity } from './entities/category.entity';
import { CategoryRepository } from './category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, CategoryRepository])],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
