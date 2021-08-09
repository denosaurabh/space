import { Section, SubHeading, SettingBox } from '@shared/settings/styles';
import Button from '@components/button';

const DataSettings: React.FC = () => {
  const downloadFile = (data: string, filename: string, type: string) => {
    const file = new Blob([data], { type: type });

    const a = document.createElement('a'),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  };

  const handleDataExport = () => {
    const currentVersion = process.env.NEXT_PUBLIC_VERSION;
    const date = Date.now();

    const dataString = localStorage.getItem('notesStorage');

    downloadFile(
      dataString,
      `notes-${currentVersion}-${date}.json`,
      'application/json'
    );
  };

  return (
    <Section>
      <SubHeading>Data Settings</SubHeading>

      <SettingBox orientation="vertical" css={{ gap: 0 }}>
        <Button onClick={handleDataExport}>Export Data</Button>
      </SettingBox>
    </Section>
  );
};

export default DataSettings;
