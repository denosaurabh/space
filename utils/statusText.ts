const Status = (
  text: 'waiting' | 'processing' | 'success' | 'failed'
): string => {
  let formattedText = '';

  switch (text) {
    case 'waiting':
      formattedText = ``;

      break;
    case 'processing':
      formattedText = `${'\u0095'} Processing...`;

      break;

    case 'success':
      formattedText = `${'\u2714'} Success`;

      break;

    case 'failed':
      formattedText = `${'\u2716'} Failed!`;

      break;

    default:
      formattedText = '';
  }

  return formattedText;
};

export default Status;
