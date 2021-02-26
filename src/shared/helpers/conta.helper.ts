export function addMaskConta(conta: string): string {
  if (conta.length <= 6) {
    conta = conta.replace(/^(\d{2})(\d{3})(\d{1})/, '$1.$2-$3');
  }

  return conta;
}
