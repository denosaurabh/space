import { NextSeo } from 'next-seo';

const LandingPageSEO: React.FC = () => {
  return (
    <NextSeo
      title="Space"
      description="Simple Productivity & Management App."
      canonical="https://space-gray.vercel.app/"
      openGraph={{
        url: 'https://space-gray.vercel.app/',
        title: 'Space',
        description: 'Simple Productivity & Management App.',
        images: [
          {
            url: 'https://i.ibb.co/JsL4MNj/space-desktop-1.webp',
            width: 1700,
            height: 868,
            alt: "Space's Website",
          },
          {
            url: 'https://i.ibb.co/tzbVND8/space-desktop-2.webp',
            width: 1200,
            height: 613,
            alt: "Space's Website",
          },
          {
            url: 'https://i.ibb.co/4gWY3h5/space-desktop-3.webp',
            width: 700,
            height: 358,
            alt: "Space's Website",
          },
          {
            url: 'https://i.ibb.co/QJnRJkH/space-desktop-4.webp',
            width: 400,
            height: 204,
            alt: "Space's Website",
          },
        ],
        site_name: 'Space',
      }}
      twitter={{
        handle: '@denosaurabh',
        site: '@denosaurabh',
        cardType: 'summary_large_image',
      }}
    />
  );
};

export default LandingPageSEO;
