import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { darkTheme, styled } from '@styled';

import { FeatureBox, MidBox, LeftBox, RightBox } from '@shared/home/featureBox';
import CircularArow from '@components/annotations/circularArrow';
import Repeat from '@components/annotations/repeat';

const AllFeaturesContainer = styled('div', {
  width: 'auto',
  height: 'auto',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const CheckMarkContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  gap: '2rem',

  [`.${darkTheme} &`]: {
    opacity: 0.3,
  },
});

const Text = styled('p', {
  fontFamily: '$indie',
  fontSize: '2rem',
  color: '$grey-500',
  marginBottom: '2rem',
});

const AllFeatures: React.FC = () => {
  const [currentCount, setCount] = useState(19);
  const timer = () => setCount(currentCount - 0.01);

  useEffect(() => {
    if (currentCount <= 0) {
      return;
    }

    // Every second, decrease the count by 0.01, so 18.45 -> 18.44, etc. 18min, 44sec
    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCount]);

  return (
    <AllFeaturesContainer>
      <FeatureBox>
        <LeftBox>
          <CircularArow
            css={{ position: 'relative', top: '30%', right: '20%' }}
          >
            {currentCount.toFixed(2)}
          </CircularArow>
        </LeftBox>
        <MidBox
          heading="Pomodoro"
          description="A simple pomodoro tool where you can set 25mins timer to complete your goal for that time, and then 5mins to rest a bit. Then repeat!"
        >
          <CircularArow
            css={{ position: 'relative', top: '30%', right: '20%' }}
          >
            {currentCount.toFixed(2)}
          </CircularArow>
        </MidBox>
        <RightBox>
          <Repeat top="work" bottom="rest" css={{ top: '-20%', left: '50%' }} />

          <Text css={{ paddingLeft: '2rem' }}>Start Task</Text>
          <Text css={{ paddingLeft: '18rem' }}>Calm</Text>
          <Text css={{ paddingLeft: '4rem' }}>Resume Task</Text>
          <Text css={{ paddingLeft: '22rem' }}>Peace</Text>
          <Text css={{ paddingLeft: '1rem' }}>Continue Task</Text>
          <Text css={{ paddingLeft: '20rem' }}>close....</Text>
          <Text css={{ paddingLeft: '8rem' }}>FINISH!</Text>
        </RightBox>
      </FeatureBox>
      <Image
        src="/assets/annotations/BigDownArrow.webp"
        alt="Big Down Arrow"
        width={100}
        height={400}
      />
      <FeatureBox>
        <LeftBox
          css={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8rem',
          }}
        >
          <Image
            src="/assets/annotations/Dots.webp"
            alt="Big Down Arrow"
            width={150}
            height={130}
          />
          <Image
            src="/assets/annotations/Dots.webp"
            alt="Big Down Arrow"
            width={150}
            height={130}
          />
        </LeftBox>
        <MidBox
          heading="Calender"
          description="A dot grid based calendar where you can make point your future goals and see your history of tasks."
          soon
        >
          <Image
            src="/assets/annotations/Dots.webp"
            alt="Big Down Arrow"
            width={150}
            height={130}
          />
        </MidBox>
        <RightBox
          css={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8rem',
          }}
        >
          <Image
            src="/assets/annotations/Dots.webp"
            alt="Big Down Arrow"
            width={150}
            height={130}
          />
          <Image
            src="/assets/annotations/Dots.webp"
            alt="Big Down Arrow"
            width={150}
            height={130}
          />
        </RightBox>
      </FeatureBox>
      <Image
        src="/assets/annotations/BigDownArrow.webp"
        alt="Big Down Arrow"
        width={100}
        height={400}
      />
      <FeatureBox>
        <LeftBox
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CheckMarkContainer>
            <Image
              className="check"
              src="/assets/annotations/Check.webp"
              alt="Check"
              width={80}
              height={80}
            />
            <Image
              src="/assets/annotations/Traced.webp"
              alt="Check"
              width={250}
              height={40}
            />
            <Image
              src="/assets/annotations/Traced.webp"
              alt="Check"
              width={250}
              height={40}
            />
          </CheckMarkContainer>
        </LeftBox>
        <MidBox
          heading="Todo"
          description="Todo list maker for every day, week, month and even year. Got bored of typical Todo maker, So I will try my best to make something better and creative."
          soon
        >
          <CheckMarkContainer>
            <Image
              className="check"
              src="/assets/annotations/Check.webp"
              alt="Check"
              width={80}
              height={80}
            />
            <Image
              src="/assets/annotations/Traced.webp"
              alt="Check"
              width={250}
              height={40}
            />
            <Image
              src="/assets/annotations/Traced.webp"
              alt="Check"
              width={250}
              height={40}
            />
          </CheckMarkContainer>
        </MidBox>
        <RightBox
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CheckMarkContainer>
            <Image
              className="cross"
              src="/assets/annotations/CrossBox.webp"
              alt="Check"
              width={100}
              height={100}
            />
            <Image
              src="/assets/annotations/TracedHigh.webp"
              alt="Check"
              width={300}
              height={50}
            />
            <Image
              src="/assets/annotations/TracedHigh.webp"
              alt="Check"
              width={330}
              height={50}
            />
          </CheckMarkContainer>
        </RightBox>
      </FeatureBox>
    </AllFeaturesContainer>
  );
};

export default AllFeatures;
