import { styled } from '@styled';

const FeatureContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '4rem',

  maxWidth: '50rem',

  margin: '50rem 0',
  textAlign: 'center',
});

const Heading = styled('h1', {
  fontFamily: '$inter',
  fontSize: '10rem',
  fontWeight: 'bold',
  color: '$grey-800',
});

const Text = styled('p', {
  fontFamily: '$inter',
  fontSize: '1.8rem',
  lineHeight: '150%',
  color: '$grey-700',
});

interface FeatureBoxI {
  heading: string;
  description: string;
}

const FeatureBox: React.FC<FeatureBoxI> = ({ heading, description }) => {
  return (
    <FeatureContainer>
      <Heading>{heading}</Heading>
      <Text>{description}</Text>
    </FeatureContainer>
  );
};

export default FeatureBox;
