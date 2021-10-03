import { useEffect, useState } from 'react';
import { styled } from '@styled';

import Input from '@components/input';
import Button from '@components/button';

import {
  Root as PopoverRoot,
  StyledTrigger as PopoverTrigger,
  Anchor as PopoverAnchor,
  StyledContent as PopoverContent,
  StyledButton as PopoverButton,
} from '@components/popover';

import {
  Root as AlertDialogRoot,
  Trigger as AlertDialogTrigger,
  StyledOverlay as AlertDialogStyledOverlay,
  StyledContent as AlertDialogStyledContent,
  StyledTitle as AlertDialogTitle,
  StyledCancel as AlertDialogCancel,
  StyledAction as AlertDialogAction,
  StyledDescription as AlertDialogDescription,
} from '@components/alertDialog';

import MenuSvg from '@assets/svg/Menu.svg';
import CalendarSvg from '@assets/svg/Calendar.svg';
import ClockSvg from '@assets/svg/Clock.svg';
import DeleteSvg from '@assets/svg/Trash.svg';

import { Goal } from '@lib/store/calendar';
import useCalendar from '@state/calendar';

import reverseDateStr from '@utils/reverseDate';

type GoalBoxProps = Goal;

const GoalBox: React.FC<GoalBoxProps> = ({
  id,
  title,
  description,
  date,
  time,
}) => {
  const { deleteGoal } = useCalendar(({ deleteGoal }) => ({ deleteGoal }));

  const onDeleteConfirmClick = () => {
    deleteGoal(id);
  };

  return (
    <GoalBoxContainer>
      <GoalHeaderBox>
        <GoalBoxHeading>{title}</GoalBoxHeading>
        <PopoverRoot>
          <PopoverTrigger>
            <MenuSvgStyled />
          </PopoverTrigger>
          <PopoverAnchor />

          <PopoverContent
            color="light"
            dropShadow
            css={{
              width: '18rem',
              padding: '1rem 0.4rem',
              flexDirection: 'column',
            }}
          >
            {/* <PopoverButton>
              &uarr; Switch Up
            </PopoverButton>
            <PopoverButton>
              &darr; Switch Down
            </PopoverButton> */}

            <AlertDialogRoot>
              <AlertDialogTrigger css={{ width: '90%', marginRight: '0' }}>
                <PopoverButton css={{ width: '100%', marginRight: '0' }}>
                  <DeleteSvg width={15} height={15} />
                  Delete
                </PopoverButton>
              </AlertDialogTrigger>
              <AlertDialogStyledOverlay />
              <AlertDialogStyledContent
                className="goal-box-alert-dialog"
                css={{ width: '60rem' }}
              >
                <AlertDialogTitle>
                  Are you sure to delete &quot;{title}&quot; Goal
                </AlertDialogTitle>
                <AlertDialogDescription>
                  The action is NOT reversible
                </AlertDialogDescription>

                <AlertDialogAction onClick={onDeleteConfirmClick}>
                  Delete Goal
                </AlertDialogAction>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogStyledContent>
            </AlertDialogRoot>
          </PopoverContent>
        </PopoverRoot>
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
  const { createGoal, activeFullDate, setShowCreateNewGoal } = useCalendar(
    ({ createGoal, activeFullDate, setShowCreateNewGoal }) => ({
      createGoal,
      activeFullDate,
      setShowCreateNewGoal,
    })
  );

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

    setShowCreateNewGoal();
  };

  useEffect(() => {
    const [day, month, year] = activeFullDate
      .split('-')
      .map((e: string): number => parseInt(e));

    const updatedDay = day.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });

    const updatedMonth = (month + 1).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });

    setForm({
      ...form,
      date: `${year}-${updatedMonth}-${updatedDay}`,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFullDate]);

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
          <InfoIcon>
            <CalendarSvg />
          </InfoIcon>
          {form.date}
          {/* <Input
            name="date"
            type="date"
            label="Pick Date"
            placeholder="Coffee Meet"
            onChange={handleInputChange}
            value={form.date}
            required
          /> */}
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
        <Button type="submit" css={{ marginLeft: 'auto' }}>
          Save
        </Button>
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

  marginRight: 'auto',
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

const MenuSvgStyled = styled(MenuSvg, {
  fill: '$grey-800',

  '&:hover': {
    cursor: 'pointer',
  },
});
