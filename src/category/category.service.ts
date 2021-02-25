import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CategoryInput } from './dto/category-input.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async getCategories(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.getCategories();
  }

  async createCategories(params: CategoryInput): Promise<CategoryEntity> {
    return await this.categoryRepository.createCategories(params);
  }

  async updateCategories(
    id: number,
    params: CategoryInput
  ): Promise<CategoryEntity> {
    return await this.categoryRepository.updateCategories(id, params);
  }

  async deleteCategories(id: number): Promise<void> {
    return await this.categoryRepository.deleteCategories(id);
  }
}
