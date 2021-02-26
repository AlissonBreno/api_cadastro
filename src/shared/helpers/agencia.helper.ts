export function addMaskAgencia(agencia: string): string {
  if (agencia.length <= 4) {
    console.log(agencia);
    agencia = agencia.replace(/^(\d{3})(\d{1})/, '$1-$2');
    console.log(agencia);
  }

  return agencia;
}
