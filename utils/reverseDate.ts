const reverseDateStr = (dateStr: string): string => {
  const reverseDateArr = dateStr.split('-').reverse();
  const reversedDateStr = reverseDateArr.join('-');

  return reversedDateStr;
};

export default reverseDateStr;
