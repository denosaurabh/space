import { styled } from '@styled';

const InputContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  width: 'auto',
});

const InputLabel = styled('label', {
  fontFamily: '$inter',
  fontSize: '0.9rem',
  marginBottom: '0.8rem',
});

const StyledInput = styled('input', {
  width: '100%',
  height: '0.9rem',

  fontFamily: '$inter',
  fontSize: '1rem',

  padding: '1.6rem 1rem',

  border: '1px solid $grey-700',
  borderRadius: '0.8rem',
});

interface InputI {
  label?: string;
  [key: string]: unknown;
}

const Input: React.FC<InputI> = ({ label, ...inputProps }) => {
  return (
    <InputContainer>
      {label ? <InputLabel htmlFor="input">{label}</InputLabel> : null}
      <StyledInput {...inputProps} />
    </InputContainer>
  );
};

export default Input;
