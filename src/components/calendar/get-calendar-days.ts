export function getCalendarDays(year: number, month: number): (number | undefined)[][] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = (new Date(year, month, 1).getDay() + 6) % 7;
  // создаём массив дней месяца + пустые слоты в начале
  const allDays = [
    ...Array(startDay).fill(undefined),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // добиваем хвост до кратности 7
  while (allDays.length % 7 !== 0) allDays.push(undefined);

  // разбиваем по 7 элементов
  return Array.from({ length: allDays.length / 7 }, (_, i) => allDays.slice(i * 7, i * 7 + 7));
}
