export function removeMask(value: string): string {
  return value.replace(/[^A-Z0-9]/gi, '');
}
