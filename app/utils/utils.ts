export const generateCalendar = (year: number) => {
    const firstDayOfYear = new Date(year, 0, 1);
    const daysInYear = (new Date(year, 11, 31).getTime() - firstDayOfYear.getTime()) / (1000 * 60 * 60 * 24) + 1;
    return Array.from({ length: daysInYear }, (_, i) => new Date(year, 0, i + 1));
  };
  