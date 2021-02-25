import { IsNotEmpty } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  categoria: string;

  @IsNotEmpty()
  url_icon: string;
}
