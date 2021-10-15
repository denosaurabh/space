import useCalendar from '@state/calendar';
import removeZeroPad from './zeroPad';

const dateBeautify = (date: string): string => {
  const { months } = useCalendar.getState();

  const dateArr = date.split('-');

  const day = removeZeroPad(dateArr[1]);
  const month = removeZeroPad(dateArr[0]);
  const year = dateArr[2];

  const monthName = months[month];

  return `${day} ${monthName} ${year}`;
};

export default dateBeautify;
