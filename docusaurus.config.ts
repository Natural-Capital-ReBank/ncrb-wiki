import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const isProduction = process.env.ALLOW_INDEXING === 'true';

const config: Config = {
  title: 'Natural Capital ReBank',
  tagline: 'Official NCRB Marketplace Documentation',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://wiki.ncrb.world',
  baseUrl: '/',

  organizationName: 'Natural Capital ReBank',
  projectName: 'NCRBwiki',

  onBrokenLinks: 'throw',

  // Prevent non-production deployments from being indexed
  noIndex: !isProduction,

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Structured data for AEO / GEO (Answer Engine & Generative Engine Optimization)
  headTags: [
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Natural Capital ReBank',
        alternateName: 'NCRB',
        url: 'https://ncrb.world',
        logo: 'https://wiki.ncrb.world/img/ncrb-logo.png',
        description:
          'Natural Capital ReBank (NCRB) is a Real World Asset (RWA) tokenization marketplace for natural capital assets including carbon credits, biodiversity, water rights, and more — powered by blockchain technology.',
        sameAs: [
          'https://x.com/NCRBplatform',
          'https://www.linkedin.com/company/natural-capital-rebank/',
          'https://facebook.com/NCRBplatform',
          'https://youtube.com/@NCRBplatform',
        ],
      }),
    },
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'NCRB Wiki',
        url: 'https://wiki.ncrb.world',
        description:
          'Official documentation and knowledge base for the Natural Capital ReBank marketplace — guides, FAQs, developer references, and smart contract documentation.',
        publisher: {
          '@type': 'Organization',
          name: 'Natural Capital ReBank',
          url: 'https://ncrb.world',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://wiki.ncrb.world/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      }),
    },
  ],

  plugins: [
    ...(isProduction
      ? [['@docusaurus/plugin-google-gtag', { trackingID: 'G-JRD4XVQLXP' }]]
      : []),
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/ncrb-logo.png',
    metadata: [
      {name: 'keywords', content: 'NCRB, natural capital, RWA tokenization, carbon credits, biodiversity credits, blockchain, DeFi, real world assets, marketplace'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:site', content: '@NCRBplatform'},
      {name: 'og:type', content: 'website'},
      {name: 'og:site_name', content: 'NCRB Wiki'},
    ],
    algolia: {
      appId: 'CAZHEJVH9P',
      apiKey: '12fcab9e2e58cb3beaa6ca1727f39529',
      indexName: 'NCRB Wiki',
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '',
      logo: {
        alt: 'NCRB Logo',
        src: 'img/ncrb-logo.png',
      },
      items: [
        {
          type: 'doc',
          docId: 'marketplace/intro',
          position: 'left',
          label: 'Guides',
        },
        {
          type: 'doc',
          docId: 'faq/faq',
          position: 'left',
          label: 'FAQs',
        },
        {
          type: 'doc',
          docId: 'developers/intro',
          position: 'left',
          label: 'Developers',
        },
        {
          href: 'https://www.ncrb.world/coming-soon',
          label: 'Marketplace',
          position: 'right',
        },
        {
          href: 'https://ncrb.world',
          label: 'Website',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'ABOUT',
          items: [
            {
              label: 'Welcome To NCRB',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'GUIDES',
          items: [
            {
              label: 'Marketplace',
              to: '/docs/marketplace',
            },
          ],
        },
        {
          title: 'DEVELOPERS',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/developers',
            },
          ],
        },
        {
          title: 'Links',
          items: [
            {
              label: 'NCRB Website',
              href: 'https://ncrb.world',
            },
            {
              label: 'NCRB Marketplace',
              href: 'https://www.ncrb.world/coming-soon',
            },
            {
              label: 'X',
              href: 'https://x.com/NCRBplatform',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/natural-capital-rebank/',
            },
            {
              label: 'Facebook',
              href: 'https://facebook.com/NCRBplatform',
            },
            {
              label: 'YouTube',
              href: 'https://youtube.com/@NCRBplatform',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Natural Capital ReBank, Inc. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
