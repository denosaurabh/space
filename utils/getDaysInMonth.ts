const daysInMonth = (month: number, year: number): number => {
  const days = new Date(year, month, 32).getDate();
  const daysinMonth = 32 - days;

  return daysinMonth;
};

export default daysInMonth;
