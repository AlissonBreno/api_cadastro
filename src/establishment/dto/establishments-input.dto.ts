import { IsNotEmpty, Length } from 'class-validator';

export class EstablishmentsDto {
  @IsNotEmpty()
  razao_social: string;

  @IsNotEmpty()
  @Length(18, 18)
  cnpj: string;

  nome_fantasia: string;

  email: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  agencia: string;
  conta: string;

  @IsNotEmpty()
  categoria: number;

  @IsNotEmpty()
  status: boolean;

  data_cadastro: Date;
}
