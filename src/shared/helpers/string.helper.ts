export function removeMask(value: string): string {
  if (value == '') {
    return value;
  }
  return value.replace(/[^A-Z0-9]/gi, '');
}
