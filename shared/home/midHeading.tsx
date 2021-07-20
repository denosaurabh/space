/* eslint-disable @next/next/no-img-element */
import { styled } from '@styled';

import UnderlineSvg from '@annotations/space/underline.svg';

import { AnnoGroup, Annotation } from '@components/annotation';
import TextArrow from '@components/annotations/textArrow';

const MidBoxContainer = styled('div', {
  position: 'absolute',
  top: '60%',
  transform: 'translateY(-50%)',

  padding: '8rem',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4rem',
});

const HeadingContainer = styled('div', {
  display: 'flex',
});

const Heading = styled('h1', {
  fontFamily: '$inter',
  fontSize: '12rem',
  fontWeight: '900',
  color: '$grey-800',

  textShadow: '0px 2.5rem 2.5rem rgba(0, 0, 0, 0.25)',

  '& + svg': {
    transition: '$slow',
    opacity: 0,
  },

  '&:hover': {
    '& + svg': {
      opacity: 1,
    },
  },
});

const Text = styled('p', {
  fontFamily: '$inter',
  fontSize: '2rem',
  color: '$grey-700',
});

const MidHeading: React.FC = () => {
  return (
    <MidBoxContainer>
      <Annotation css={{ annoPos: '84% 0% 0% -25%' }}>
        <AnnoGroup>
          <UnderlineSvg />
        </AnnoGroup>

        <HeadingContainer>
          <TextArrow
            text="Simple"
            arrow={
              <img
                src="/assets/annotations/space/simple.webp"
                alt="Arrow"
                width={120}
                height={120}
              />
            }
            annoPos="-60% 0% 0% -160%"
            textPos={{
              top: '5%',
              left: '-35%',
            }}
          >
            <Heading>S</Heading>
          </TextArrow>
          <TextArrow
            text="Personal & Productivity"
            annoPos="-80% 0% 0% -90%"
            arrow={
              <img
                src="/assets/annotations/space/personal-productivity.webp"
                alt="Arrow"
                width={140}
                height={140}
              />
            }
            textPos={{
              top: '-50%',
              left: '0',
            }}
          >
            <Heading>p</Heading>
          </TextArrow>
          <TextArrow
            text="No Ads, No Analytics and no Auth Required"
            annoPos="-105% 0% 0% 30%"
            arrow={
              <img
                src="/assets/annotations/space/no-auth-ads-analytics.webp"
                alt="Arrow"
                width={140}
                height={180}
              />
            }
            textPos={{
              top: '-40%',
              left: '100%',
              width: '20rem',
            }}
          >
            <Heading>a</Heading>
          </TextArrow>
          <TextArrow
            text="Completely Free"
            annoPos="-60% 0% 0% 70%"
            arrow={
              <img
                src="/assets/annotations/space/completely-free.webp"
                alt="Arrow"
                width={120}
                height={120}
              />
            }
            textPos={{
              top: '-10%',
              left: '650%',
              width: '14rem',
            }}
          >
            <Heading>c</Heading>
          </TextArrow>
          <TextArrow
            text="Easy to Use"
            annoPos="-20% 0% 0% 100%"
            arrow={
              <img
                src="/assets/annotations/space/easy-to-use.webp"
                alt="Arrow"
                width={120}
                height={120}
              />
            }
            textPos={{
              top: '0%',
              right: '-90%',
              width: '12rem',
            }}
          >
            <Heading>e</Heading>
          </TextArrow>
          {/* <TextArrow text="Personal & Productivity" arrow={<Image />}>
            <Heading>p</Heading>
          </TextArrow>
          <TextArrow>
            <Heading
              text="No Ads, Analytics or auth required"
              arrow={<Image />}
            >
              a
            </Heading>
          </TextArrow>
          <TextArrow text="Completely Free" arrow={<Image />}>
            <Heading>c</Heading>
          </TextArrow>
          <TextArrow text="Easy to Use" arrow={<Image />}>
            <Heading>e</Heading>
          </TextArrow> */}
          {/* <Annotation css={{ annoPos: '-70% 100%' }}>
            <SimpleSvg />
          </Annotation>
          <Annotation css={{ annoPos: '-140% 0%' }}>
            <Heading>p</Heading>
            <PersonalProductivitySvg />
          </Annotation>
          <Annotation css={{ annoPos: '-160% 0% 0% 20%' }}>
            <Heading>a</Heading>
            <NoAuthAdsAnalyticsSvg />
          </Annotation>
          <Annotation css={{ annoPos: '-80% 0% 0% 50%' }}>
            <Heading>c</Heading>
            <ComletelyFreeSvg />
          </Annotation>
          <Annotation css={{ annoPos: '-70% 0% 0% 100%' }}>
            <Heading>e</Heading>
            <EasyToUseSvg />
          </Annotation> */}
        </HeadingContainer>
      </Annotation>

      <Text>Simple Productivity & Management Tool</Text>
    </MidBoxContainer>
  );
};

export default MidHeading;
