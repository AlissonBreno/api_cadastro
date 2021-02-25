import { Injectable } from '@nestjs/common';

export class CategoryEntity {
  categoria: string;
}

export class CategoryRepository {
  async getCategories(): Promise<CategoryEntity> {
    return new CategoryEntity();
  }
}

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}
  async getCategories(): Promise<any> {
    return this.categoryRepository.getCategories();
  }
}
