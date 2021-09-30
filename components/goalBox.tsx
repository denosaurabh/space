import { useState } from 'react';
import { styled } from '@styled';

import Input from '@components/input';
import Button from '@components/button';

import MenuSvg from '@assets/svg/Menu.svg';
import CalendarSvg from '@assets/svg/Calendar.svg';
import ClockSvg from '@assets/svg/Clock.svg';

import { Goal } from '@lib/store/calendar';
import useCalendar from '@state/calendar';

import reverseDateStr from '@utils/reverseDate';

type GoalBoxProps = Goal;

const GoalBox: React.FC<GoalBoxProps> = ({
  title,
  description,
  date,
  time,
}) => {
  return (
    <GoalBoxContainer>
      <GoalHeaderBox>
        <GoalBoxHeading>{title}</GoalBoxHeading>
        <MenuSvg />
      </GoalHeaderBox>
      <GoalBoxPara>{description}</GoalBoxPara>
      <InfoContainer>
        <InfoBox>
          <InfoIcon>
            <CalendarSvg />
          </InfoIcon>
          {date}
        </InfoBox>
        <InfoBox>
          <InfoIcon>
            <ClockSvg />
          </InfoIcon>
          {time}
        </InfoBox>
        <GoalSpan css={{ marginLeft: 'auto' }}>2 days 12 hours</GoalSpan>
      </InfoContainer>
    </GoalBoxContainer>
  );
};

const CreateGoalBox: React.FC = () => {
  const { createGoal } = useCalendar(({ createGoal }) => ({ createGoal }));

  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);

    createGoal({ ...form, date: reverseDateStr(form.date) });
  };

  return (
    <GoalBoxContainer as="form" onSubmit={handleSubmit}>
      <GoalHeaderBox>
        <Input
          name="title"
          label="Title"
          type="text"
          placeholder="Coffee Meet"
          css={{ width: '100%' }}
          onChange={handleInputChange}
          value={form.title}
          required
        />
      </GoalHeaderBox>
      <Input
        name="description"
        type="text"
        label="Small Description"
        placeholder="Coffee Meet"
        css={{ width: '100%', input: { height: '10rem' } }}
        onChange={handleInputChange}
        value={form.description}
        required
      />
      <InfoContainer>
        <InfoBox>
          <Input
            name="date"
            type="date"
            label="Pick Date"
            placeholder="Coffee Meet"
            onChange={handleInputChange}
            value={form.date}
            required
          />
        </InfoBox>
        <InfoBox>
          <Input
            name="time"
            type="time"
            label="Pick Time"
            placeholder="Coffee Meet"
            onChange={handleInputChange}
            value={form.time}
            required
          />
        </InfoBox>
        <Button type="submit">Save</Button>
      </InfoContainer>
    </GoalBoxContainer>
  );
};

export { GoalBox, CreateGoalBox };

const GoalBoxContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',

  width: '50rem',
  height: 'auto',

  padding: '2rem',

  border: '1px solid $grey-300',
  borderRadius: '10px',
});

const GoalHeaderBox = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  svg: {
    transform: 'rotate(90deg)',

    width: 20,
    height: 20,

    fill: '$grey-700',
  },
});

const GoalBoxHeading = styled('h6', {
  fontFamily: '$inter',
  fontSize: '2.4rem',
  color: '$grey-800',
});

const GoalBoxPara = styled('h6', {
  fontFamily: '$inter',
  fontSize: '1.5rem',
  fontWeight: 'normal',
  lineHeight: '25px',

  color: '$grey-700',

  width: '90%',
  paddingBottom: '3rem',
});

const GoalSpan = styled('span', {
  fontFamily: '$inter',
  fontSize: '1.4rem',
  color: '$grey-600',
});

const InfoContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '3rem',

  width: '100%',
});

const InfoBox = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',

  fontFamily: '$inter',
  fontSize: '1.4rem',
  color: '$grey-700',
});

const InfoIcon = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  padding: '1rem',

  backgroundColor: '$grey-200',
  borderRadius: '10px',

  '& svg': {
    width: 18,
    height: 18,

    fill: '$grey-700',
  },
});
