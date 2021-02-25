import { InternalServerErrorException } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import { CategoryInput } from './dto/category-input.dto';
import { CategoryEntity } from './entities/category.entity';

@EntityRepository(CategoryEntity)
export class CategoryRepository extends Repository<CategoryEntity> {
  async getCategories(): Promise<CategoryEntity[]> {
    const result = await this.find();

    if (!result) {
      throw new InternalServerErrorException();
    }

    return result;
  }

  async createCategories(params: CategoryInput): Promise<CategoryEntity> {
    const createCategories = new CategoryEntity();
    createCategories.categoria = params.categoria;

    try {
      await validateOrReject(createCategories);
      await this.save(createCategories);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return createCategories;
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