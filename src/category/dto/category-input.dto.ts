import { IsNotEmpty } from 'class-validator';

export class CategoryInput {
  @IsNotEmpty()
  categoria: string;

  @IsNotEmpty()
  url_icon: string;
}
