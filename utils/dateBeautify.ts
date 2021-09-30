import useCalendar from '@state/calendar';

const dateBeautify = (date: string): string => {
  const { months } = useCalendar.getState();

  const dateArr = date.split('-');

  const day = dateArr[0];
  const month = dateArr[1];
  const year = dateArr[2];

  const monthName = months[month];

  return `${day} ${monthName} ${year}`;
};

export default dateBeautify;
