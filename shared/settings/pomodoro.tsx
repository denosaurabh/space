import { useState } from 'react';
import { Section, SubHeading, SettingBox } from '@shared/settings/styles';
import useSettings from '@state/settings';

import Input from '@components/input';

const PomodoroSettings: React.FC = () => {
  const { pomodoro, changePomodoroActionTime, changePomodoroRestTime } =
    useSettings((state) => ({
      pomodoro: state.pomodoro,
      changePomodoroActionTime: state.changePomodoroActionTime,
      changePomodoroRestTime: state.changePomodoroRestTime,
    }));

  const { actionTime, restTime } = pomodoro;
  console.log(pomodoro);

  const [inputActionTime, changeInputActionTime] = useState(actionTime);
  const [inputRestTime, changeInputRestTime] = useState(restTime);

  return (
    <Section>
      <SubHeading>Pomodoro</SubHeading>

      <SettingBox orientation="vertical">
        <Input
          type="number"
          min={1}
          max={100}
          name="PomodoroActionTime"
          placeholder="10 (mins)"
          label="Pomodoro Action Time (mins)"
          value={inputActionTime}
          onChange={(e) => {
            const { value } = e.target;

            if (value > 100 || value < 0) return;

            changeInputActionTime(value);

            if (value > 100 || value < 1) return;
            changePomodoroActionTime(value);
          }}
          css={{ width: '80%' }}
        />
      </SettingBox>
      <SettingBox orientation="vertical">
        <Input
          type="number"
          min={1}
          max={100}
          name="PomodoroRestTime"
          placeholder="10 (mins)"
          label="Pomodoro Rest Time (mins)"
          value={inputRestTime}
          onChange={(e) => {
            const { value } = e.target;

            if (value > 100 || value < 0) return;

            changeInputRestTime(value);

            if (value > 100 || value < 1) return;
            changePomodoroRestTime(value);
          }}
          css={{ width: '80%' }}
        />
      </SettingBox>
    </Section>
  );
};

export default PomodoroSettings;
