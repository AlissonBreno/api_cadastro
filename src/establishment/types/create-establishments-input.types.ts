export type EstablishmentsInput = {
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
};

export type updateEstablishmentsInput = {
  id: number;
  establishment: EstablishmentsInput;
};
