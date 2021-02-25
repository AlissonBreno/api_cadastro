import { IsNotEmpty } from 'class-validator';

export class EstablishmentsDto {
  @IsNotEmpty()
  razao_social: string;
  @IsNotEmpty()
  cnpj: string;

  nome_fantasia: string;
  email: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  agencia: string;
  conta: string;
  categoria: number;
  status: boolean;
}
