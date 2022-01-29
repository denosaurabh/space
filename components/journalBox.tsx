import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import { styled } from '@styled';
import useCalendar from '@state/calendar';

const JournalBox: React.FC = () => {
  const [text, setText] = useState('');

  const { activeFullDate, addOrUpdateJournal, journals } = useCalendar(
    ({ activeFullDate, addOrUpdateJournal, journals }) => ({
      journals,
      activeFullDate,
      addOrUpdateJournal,
    })
  );

  const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setText(value);
    addOrUpdateJournal(value);
  };

  useEffect(() => {
    if (journals[activeFullDate]) {
      setText(journals[activeFullDate]);
    } else {
      setText('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFullDate]);

  return (
    <JournalContainer>
      <h3>Journal</h3>
      <textarea
        placeholder={`Write your ${dayjs(activeFullDate, 'YYYY-M-D').format(
          'D MMMM YYYY'
        )} journal here .... \n\neven just a sentence or entire story :)`}
        spellCheck={false}
        value={text}
        onChange={onTextAreaChange}
      />
    </JournalContainer>
  );
};

export default JournalBox;

const JournalContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '3rem',

  minWidth: '30rem',

  '& h3': {
    fontSize: '4rem',
    color: '$grey-800',
  },

  '& textarea': {
    width: '100%',
    minHeight: '70rem',

    backgroundColor: 'transparent',
    outline: 'none',
    border: 'none',

    fontFamily: '$mono',
    fontSize: '1.4rem',
    color: '$grey-800',
  },
});
