export function br2dbDataFormat(date: string): Date {
  const splitedDate = date.split('/');
  date = `${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`;
  const parts = date.match(/(\d+)/g);

  return new Date(
    parseInt(parts[0]),
    parseInt(parts[1]) - 1,
    parseInt(parts[2])
  );
}

export function db2brDataFormat(date: Date): string {
  return '';
}
