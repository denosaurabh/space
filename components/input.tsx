import { styled, darkTheme } from '@styled';

const InputContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  width: 'auto',
});

const InputLabel = styled('label', {
  fontFamily: '$inter',
  fontSize: '1.4rem',
  marginBottom: '0.8rem',

  [`.${darkTheme} &`]: {
    color: '$grey-600',
  },
});

const StyledInput = styled('input', {
  width: '100%',

  fontFamily: '$inter',
  fontSize: '1.5rem',

  padding: '1.6rem 1.5rem',

  backgroundColor: '$grey-100',
  color: '$grey-800',

  border: '1px solid $grey-700',
  borderRadius: '0.8rem',
});

interface InputI {
  label?: string;
  css?: Record<string, unknown>;
  [key: string]: unknown;
}

const Input: React.FC<InputI> = ({ label, css, ...inputProps }) => {
  return (
    <InputContainer css={css}>
      {label ? <InputLabel htmlFor="input">{label}</InputLabel> : null}
      <StyledInput {...inputProps} />
    </InputContainer>
  );
};

export default Input;
