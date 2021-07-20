import React from 'react';
import { styled } from '@styled';

import FeatureBox from '@shared/home/featureBox';

const AllFeaturesContainer = styled('div', {
  width: 'auto',
  height: 'auto',
});

const AllFeatures: React.FC = () => {
  return (
    <AllFeaturesContainer>
      <FeatureBox
        heading="Pomodoro"
        description="Egestas scelerisque nullam felis, ornare feugiat penatibus massa massa dignissim. At tincidunt sed vulputate ornare. Sed morbi elementum consectetur blandit proin consectetur sed donec volutpat."
      />
      <FeatureBox
        heading="Calendar"
        description="Egestas scelerisque nullam felis, ornare feugiat penatibus massa massa dignissim. At tincidunt sed vulputate ornare. Sed morbi elementum consectetur blandit proin consectetur sed donec volutpat."
      />
      <FeatureBox
        heading="Todo"
        description="Egestas scelerisque nullam felis, ornare feugiat penatibus massa massa dignissim. At tincidunt sed vulputate ornare. Sed morbi elementum consectetur blandit proin consectetur sed donec volutpat."
      />
    </AllFeaturesContainer>
  );
};

export default AllFeatures;
