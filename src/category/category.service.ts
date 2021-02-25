import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CategoryDto } from './dto/category-input.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async getCategory(id: number): Promise<CategoryEntity> {
    return await this.categoryRepository.getCategory(id);
  }

  async getCategories(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.getCategories();
  }

  async createCategories(params: CategoryDto): Promise<CategoryEntity> {
    return await this.categoryRepository.createCategories(params);
  }

  async updateCategories(
    id: number,
    params: CategoryDto
  ): Promise<CategoryEntity> {
    return await this.categoryRepository.updateCategories(id, params);
  }

  async deleteCategories(id: number): Promise<void> {
    return await this.categoryRepository.deleteCategories(id);
  }
}
