import { Section, SubHeading, SettingBox } from '@shared/settings/styles';

import KbdShortcut from '@components/keyboardShortcut';

const KeyboardSettings: React.FC = () => {
  return (
    <Section>
      <SubHeading>Keyboard Shortcuts</SubHeading>

      <SettingBox orientation="vertical" css={{ gap: 0 }}>
        <KbdShortcut title="Changing Apps" shortcut={['Alt', 'number']} />
        <KbdShortcut title="Tooggle Theme" shortcut={['Alt', 't']} />
        <KbdShortcut title="Back to Home" shortcut={['esc']} />
        <SubHeading css={{ fontSize: '2rem', margin: '4rem 0' }}>
          Notes Shortcuts
        </SubHeading>

        <KbdShortcut title="Top Category" shortcut={['ArrowUp']} />
        <KbdShortcut title="Bottom Category" shortcut={['ArrowDown']} />
      </SettingBox>
    </Section>
  );
};

export default KeyboardSettings;
