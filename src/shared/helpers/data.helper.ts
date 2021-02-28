export function br2dbDataFormat(date: string): Date {
  if (date == '') {
    return new Date();
  }
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
  const parts = date.toString().match(/(\d+)/g);
  const month =
    parseInt(parts[1]) >= 10 ? parseInt(parts[1]) : `0${parseInt(parts[1])}`;
  return `${parts[2]}/${month}/${parts[0]}`;
}
