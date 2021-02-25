import { BadRequestException, Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get()
  async getCategories(): Promise<CategoryEntity[]> {
    return await this.categoryService.getCategories();
  }
}
