const mRound = (value: number, factor: number): number => {
  return Math.round(value / factor) * factor;
};

export default mRound;
