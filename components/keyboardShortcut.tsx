import { styled } from '@styled';

const ShortcutContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  width: '100%',

  padding: '2rem 0',
  borderBottom: '2px solid $grey-200',
});

const KBDBox = styled('div', {
  display: 'flex',
  alignItems: 'center',

  fontSize: '1.4rem',
  color: '$grey-700',
});

const Title = styled('span', {
  fontSize: '1.7rem',
  color: '$grey-700',
  fontWeight: '600',
});

const KBD = styled('kbd', {
  padding: '1rem',
  margin: '0 1rem',

  backgroundColor: '$grey-200',
  borderRadius: '1rem',
});

interface KbdShortcutProps {
  title: string;
  shortcut: string[];
}

const KbdShortcut: React.FC<KbdShortcutProps> = ({ title, shortcut }) => {
  return (
    <ShortcutContainer>
      <Title>{title}</Title>

      <KBDBox>
        {shortcut.map((el, i, arr) => (
          <div key={i}>
            <KBD>{el}</KBD>
            <span>{arr[arr.length - 1] !== el ? '+' : null}</span>
          </div>
        ))}
      </KBDBox>
    </ShortcutContainer>
  );
};

export default KbdShortcut;
