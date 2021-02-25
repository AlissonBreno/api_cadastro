import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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
  async createCategories(@Body() params: CategoryDto): Promise<CategoryEntity> {
    return await this.categoryService.createCategories(params);
  }

  @Patch(':id')
  async updateCategories(
    @Param('id') id: number,
    @Body() params: CategoryDto
  ): Promise<CategoryEntity> {
    return await this.categoryService.updateCategories(id, params);
  }

  @Delete('/:id')
  async deleteCategories(@Param('id') id: number): Promise<void> {
    return await this.categoryService.deleteCategories(id);
  }
}
