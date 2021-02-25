import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CategoryInput } from './dto/category-input.dto';
import { CategoryEntity } from './entities/category.entity';

@EntityRepository(CategoryEntity)
export class CategoryRepository extends Repository<CategoryEntity> {
  async getCategories(): Promise<CategoryEntity[]> {
    return [new CategoryEntity()];
  }

  async createCategories(params: CategoryInput): Promise<CategoryEntity> {
    return new CategoryEntity();
  }

  async updateCategories(
    id: number,
    params: CategoryInput
  ): Promise<CategoryEntity> {
    return new CategoryEntity();
  }

  async deleteCategories(id: number): Promise<void> {
    return;
  }
}
