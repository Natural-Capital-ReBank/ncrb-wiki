import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  link: string;
  description: ReactNode;
};

const FeatureList1: FeatureItem[] = [
  {
    title: 'About NCRB',
    Svg: require('@site/static/img/faq.svg').default,
    link: '/docs/intro',
    description: (
      <>
        What is the NCRB Marketplace and how does RWA tokenization work?
      </>
    ),
  },
  {
    title: 'Quick Start Guides',
    Svg: require('@site/static/img/guides.svg').default,
    link: '/docs/quickstart/',
    description: (
      <>
        Install MetaMask, add networks, and get USDC — up and running fast.
      </>
    ),
  },
  {
    title: 'Marketplace Guides',
    Svg: require('@site/static/img/guides.svg').default,
    link: '/docs/marketplace/',
    description: (
      <>
        Guides for registry partners, governance members, buyers, and admins.
      </>
    ),
  },
];

const FeatureList2: FeatureItem[] = [
  {
    title: 'Whitepapers',
    Svg: require('@site/static/img/guides.svg').default,
    link: '/docs/whitepapers/',
    description: (
      <>
        In-depth technical and market whitepapers for all 10 natural capital asset classes.
      </>
    ),
  },
  {
    title: 'FAQs',
    Svg: require('@site/static/img/faq.svg').default,
    link: '/docs/faq/',
    description: (
      <>
        Frequently asked questions about all 10 supported asset classes.
      </>
    ),
  },
  {
    title: 'For Developers',
    Svg: require('@site/static/img/for-developers.svg').default,
    link: '/docs/developers/',
    description: (
      <>
        API reference, smart contract addresses, architecture, and quality scoring.
      </>
    ),
  },
];

const FeatureList3: FeatureItem[] = [
  {
    title: 'Support',
    Svg: require('@site/static/img/faq.svg').default,
    link: '/docs/support/',
    description: (
      <>
        Get help from the NCRB team or browse common troubleshooting guides.
      </>
    ),
  },
];

function Feature({Svg, title, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <Link to={link} className={styles.featureLink}>
        <div className="text--center">
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className={clsx('text--left', styles.featureText)}>
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList1.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        <br />
        <div className="row">
          {FeatureList2.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        <br />
        <div className="row">
          {FeatureList3.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
