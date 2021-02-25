import { IsNotEmpty } from 'class-validator';

export class CategoryEntity {
  @IsNotEmpty()
  categoria: string;
}
