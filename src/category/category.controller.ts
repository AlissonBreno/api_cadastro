import { BadRequestException, Body, Get, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category-input.dto';
import { CategoryEntity } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('/list')
  async getCategories(): Promise<CategoryEntity[]> {
    return await this.categoryService.getCategories();
  }

  @Post()
  async createCategories(@Body() params: CategoryDto): Promise<any> {
    return await this.categoryService.createCategories(params);
  }
}
