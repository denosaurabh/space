import Label from '@components/label';

import { Switch, Thumb } from '@components/switch';
import {
  Root as SliderRoot,
  Track as SliderTrack,
  Range as SliderRange,
  Thumb as SliderThumb,
} from '@components/slider';

import { Section, SubHeading, SettingBox } from '@shared/settings/styles';
import useSettings from '@state/settings';

const NotesSettings: React.FC = () => {
  const { enableGrid, gridSize, toggleGrid, changeGridSize } = useSettings(
    (state) => ({
      ...state.notes,
      toggleGrid: state.toggleGrid,
      changeGridSize: state.changeGridSize,
    })
  );

  const onSliderValueChange = (value: number[]) => {
    changeGridSize(value[0]);
  };

  return (
    <Section>
      <SubHeading>Notes</SubHeading>

      <SettingBox orientation="horizontal">
        <Label htmlFor="button">Toggle Grid</Label>
        <Switch checked={enableGrid} onCheckedChange={() => toggleGrid()}>
          <Thumb />
        </Switch>
      </SettingBox>

      <SettingBox orientation="vertical">
        <Label htmlFor="span">Grid Size</Label>
        <SliderRoot
          css={{ width: '80%' }}
          defaultValue={[10]}
          max={26}
          min={4}
          step={2}
          value={[gridSize]}
          onValueChange={onSliderValueChange}
        >
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb />
        </SliderRoot>
      </SettingBox>
    </Section>
  );
};

export default NotesSettings;
