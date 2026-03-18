import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList1: FeatureItem[] = [
  {
    title: 'About',
    Svg: require('@site/static/img/faq.svg').default,
    link: '/docs/about',
    description: (
      <>
        What is NCRB Marketplace.
      </>
    ),
  },
  {
    title: 'Quick Start Guides',
    Svg: require('@site/static/img/guides.svg').default,
    link: '/docs/guides',
    description: (
      <>
        Get up and running quickly.
      </>
    ),
  },
  {
    title: 'Marketplace Guides',
    Svg: require('@site/static/img/guides.svg').default,
    link: '/docs/marketplace',
    description: (
      <>
        Everything related to NCRB Marketplace.
      </>
    ),
  },
];

const FeatureList2 = [
  {
    title: 'FAQs',
    Svg: require('@site/static/img/faq.svg').default,
    link: '/docs/faq',
    description: (
      <>
        Frequently Asked Questions.
      </>
    ),
  },
  {
    title: 'For Developers',
    Svg: require('@site/static/img/for-developers.svg').default,
    link: '/docs/developers',
    description: (
      <>
        Developers documentation.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
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
      </div>
    </section>
  );
}
