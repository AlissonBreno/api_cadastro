import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import { CategoryDto } from './dto/category-input.dto';
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

  async createCategories(params: CategoryDto): Promise<CategoryEntity> {
    const createCategories = new CategoryEntity();
    createCategories.categoria = params.categoria;
    createCategories.url_icon = params.url_icon;

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
    params: CategoryDto
  ): Promise<CategoryEntity> {
    const category = await this.findOne(id);

    if (!category) {
      throw new NotFoundException(`The category was not found.`);
    }

    await this.update({ id: id }, params);
    return await this.findOne(id);
  }

  async deleteCategories(id: number): Promise<void> {
    const category = await this.findOne(id);

    if (!category) {
      throw new NotFoundException(`The category was not found.`);
    }

    try {
      await this.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
