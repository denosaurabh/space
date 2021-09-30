import { styled } from '@styled';
import { CreateGoalBox } from '@components/goalBox';

const CreateGoal: React.FC = () => {
  return (
    <CreateGoalContainer>
      <h4>Create a new Goal</h4>
      <CreateGoalBox />
    </CreateGoalContainer>
  );
};

export default CreateGoal;

const CreateGoalContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',

  h4: {
    fontFamily: '$inter',
    fontSize: '1.6rem',
    fontWeight: 600,

    color: '$grey-800',
  },
});
