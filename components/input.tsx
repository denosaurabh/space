import { styled } from '@styled';

const InputContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  width: 'auto',
});

const InputLabel = styled('label', {
  fontFamily: '$inter',
  fontSize: '1.4rem',
  marginBottom: '0.8rem',
});

const StyledInput = styled('input', {
  width: '100%',

  fontFamily: '$inter',
  fontSize: '1.5rem',

  padding: '1.6rem 1.5rem',

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
