export function addMaskTelefone(telefone: string): string {
  if (telefone.length <= 11) {
    telefone = telefone.replace(
      /^(\d{2})(\d{1})(\d{4})(\d{4})/,
      '($1)$2 $3 $4'
    );
  }
  return telefone;
}
