import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(calendar);
dayjs.extend(relativeTime);

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
import CounterClockwiseSvg from '@assets/svg/CounterClockwise.svg';
import BellSvg from '@assets/svg/Bell.svg';

import { Goal } from '@lib/store/calendar';
import useCalendar from '@state/calendar';
import Label from './label';

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

  const onNotificationTimeClick = async (e) => {
    const { time, text } = e.target.dataset;
    console.log(time, text);

    const registration = await navigator.serviceWorker.ready;

    if ('periodicSync' in registration) {
      try {
        // @ts-expect-error: Ignore this
        await registration.periodicSync.register('notification' + time, {
          minInterval: dayjs(time).subtract(dayjs().valueOf(), 'millisecond'),
        });
      } catch (error) {
        console.log('Periodic background sync cannot be used.');
      }
    }
  };

  const day = dayjs(`${date} ${time}`, 'YYYY-M-D HH:mm');

  return (
    <GoalBoxContainer>
      <GoalHeaderBox>
        <GoalBoxHeading>{title}</GoalBoxHeading>

        <MenuIconsContainer>
          <PopoverRoot>
            <PopoverTrigger
              css={{
                backgroundColor: '$grey-200',
                padding: '0.75rem',
                borderRadius: '1rem',

                transition: 'all 0.2s',

                '&:hover': {
                  cursor: 'pointer',
                  backgroundColor: '$grey-300',
                },

                '& svg': {
                  transform: 'rotateZ(0deg)',
                },
              }}
            >
              <BellSvg />
            </PopoverTrigger>
            <PopoverAnchor />

            <PopoverContent
              color="light"
              dropShadow
              css={{
                marginTop: '1rem',
                width: '10rem',
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

              <PopoverButton
                data-time={day.subtract(10, 'minute').valueOf()}
                data-text={`Your Event (${title}) will begin in 10mins`}
                onClick={onNotificationTimeClick}
              >
                10mins
              </PopoverButton>
              <PopoverButton
                data-time={day.subtract(30, 'minute').valueOf()}
                data-text={`Your Event (${title}) will begin in 30mins`}
                onClick={onNotificationTimeClick}
              >
                30mins
              </PopoverButton>
              <PopoverButton
                data-time={day.subtract(1, 'hour').valueOf()}
                data-text={`Your Event (${title}) will begin in 1hour`}
                onClick={onNotificationTimeClick}
              >
                1 hour
              </PopoverButton>
              <PopoverButton
                data-time={day.subtract(1, 'day').valueOf()}
                data-text={`Your Event (${title}) will begin in 1day`}
                onClick={onNotificationTimeClick}
              >
                1 day
              </PopoverButton>
            </PopoverContent>
          </PopoverRoot>

          <PopoverRoot>
            <PopoverTrigger
              css={{
                backgroundColor: '$grey-200',
                padding: '1rem 1rem 0.5rem 0.5rem',
                borderRadius: '1rem',

                transition: 'all 0.2s',

                '&:hover': {
                  cursor: 'pointer',
                  backgroundColor: '$grey-300',
                },
              }}
            >
              <MenuSvgStyled />
            </PopoverTrigger>
            <PopoverAnchor />

            <PopoverContent
              color="light"
              dropShadow
              css={{
                width: '18rem',
                padding: '1rem 0.4rem',
                marginTop: '1rem',
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
        </MenuIconsContainer>
      </GoalHeaderBox>
      <GoalBoxPara>{description}</GoalBoxPara>
      <InfoContainer>
        <InfoBox>
          <InfoIcon>
            <CalendarSvg />
          </InfoIcon>
          {day.format('DD MMM YYYY')}
        </InfoBox>
        <InfoBox>
          <InfoIcon>
            <ClockSvg />
          </InfoIcon>
          {day.format('hh:mm A')}
        </InfoBox>
        <GoalSpan css={{ marginLeft: 'auto' }}>
          <CounterClockwiseSvg />

          {day.fromNow()}
        </GoalSpan>
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

    if (!form.title || !form.date || !form.time) return;

    createGoal({ ...form, date: activeFullDate });

    setShowCreateNewGoal();
  };

  useEffect(() => {
    const beautifyDate = dayjs(activeFullDate, 'YYYY-M-D').format(
      'D MMMM YYYY'
    );

    setForm({
      ...form,
      date: beautifyDate,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFullDate]);

  return (
    <GoalBoxContainer as="form" onSubmit={handleSubmit}>
      <FormBox>
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
        />
        <InfoContainer>
          <Column>
            <Label htmlFor="" css={{ fontWeight: 400 }}>
              Date
            </Label>

            <InfoBox>
              <InfoIcon>
                <CalendarSvg />
              </InfoIcon>
              {form.date}
            </InfoBox>
          </Column>

          {/* <Input
            name="date"
            type="date"
            label="Pick Date"
            placeholder="Coffee Meet"
            onChange={handleInputChange}
            value={form.date}
            disabled
          /> */}
          <InfoBox css={{ borderWidth: 0, flex: 1 }}>
            <Input
              name="time"
              type="time"
              label="Pick Time"
              placeholder="Coffee Meet"
              onChange={handleInputChange}
              value={form.time}
              css={{ width: '100%' }}
              required
            />
          </InfoBox>
        </InfoContainer>
      </FormBox>

      <ActionBox>
        <Button type="submit">Save</Button>

        <Button
          color="light"
          css={{ boxShadow: 'none !important' }}
          onClick={setShowCreateNewGoal}
        >
          Cancel
        </Button>
      </ActionBox>
    </GoalBoxContainer>
  );
};

export { GoalBox, CreateGoalBox };

const GoalBoxContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',

  // width: '50rem',
  height: 'auto',

  '@mobile': {
    width: '100%',
  },

  // transition: 'all 0.2s',

  // '&:hover': {
  //   boxShadow: '0rem 0.5rem 1rem rgba(0,0,0,0.05)',
  // },
});

const FormBox = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  padding: '2rem',

  border: '1px solid $grey-300',
  borderRadius: '10px',

  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
});

const ActionBox = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',

  button: {
    width: '100%',
  },
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
  display: 'flex',
  alignItems: 'center',
  gap: '0.7rem',

  fontFamily: '$inter',
  fontSize: '1.4rem',
  color: '$grey-600',

  width: '100%',

  '& svg': {
    width: 18,
    height: 18,

    fill: '$grey-700',
  },

  '@mobile': {
    flex: '1',
  },
});

const InfoContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '2rem',

  width: '100%',
});

const InfoBox = styled('div', {
  width: 'fit-content',

  display: 'flex',
  alignItems: 'center',
  gap: '1rem',

  fontFamily: '$inter',
  fontSize: '1.4rem',
  color: '$grey-700',

  paddingRight: '1rem',

  border: '1px solid $grey-300',
  borderRadius: '10px',
});

const InfoIcon = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  padding: '1rem',

  backgroundColor: '$grey-200',
  borderRadius: '10px 0 0 10px',

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

const MenuIconsContainer = styled('div', {
  display: 'flex',
  gap: '0.5rem',
});

const Column = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
});
