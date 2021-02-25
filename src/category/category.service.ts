import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CategoryInput } from './dto/category-input.dto';

export class CategoryEntity {
  categoria: string;
}

export class CategoryRepository {
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
}

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
}
