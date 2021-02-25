export class EstablishmentsDto {
  razao_social: string;
  nome_fantasia: string;
  cnpj: string;
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

export class updateEstablishmentsDto {
  id: number;
  establishment: EstablishmentsDto;
}
