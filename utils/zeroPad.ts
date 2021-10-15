const zeroPad = (no: number | string): string => {
  const noStr = no.toString();

  if (noStr.length == 1) {
    return '0' + no;
  }

  if (noStr.length == 2 && noStr.startsWith('0')) {
    return noStr[1];
  }

  return noStr;
};

export default zeroPad;
