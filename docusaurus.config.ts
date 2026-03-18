import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Natural Capital ReBank',
  tagline: 'Official NCRB Marketplace Documentations!',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://wiki.ncrb.world',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  organizationName: 'Natural Capital ReBank',
  projectName: 'NCRBwiki',

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        // blog: {
        //   showReadingTime: true,
        //   feedOptions: {
        //     type: ['rss', 'atom'],
        //     xslt: true,
        //   },
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        //   // Useful options to enforce blogging best practices
        //   onInlineTags: 'warn',
        //   onInlineAuthors: 'warn',
        //   onUntruncatedBlogPosts: 'warn',
        // },
        theme: {
          customCss: './src/css/custom.css',
        },
        // gtag: {
        //   trackingID: 'G-DE7XL5LS8W',
        //   anonymizeIP: false,
        // },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    // image: 'img/docusaurus-social-card.jpg',
    algolia: {
      // The application ID provided by Algolia
      appId: 'CAZHEJVH9P',
      // Public API key: it is safe to commit it
      apiKey: '12fcab9e2e58cb3beaa6ca1727f39529',
      indexName: 'NCRB Wiki',
      // askAi: 'YOUR_ALGOLIA_ASSISTANT_ID', // Replace with your Algolia Assistant ID
      // // Optional: see doc section below
      // contextualSearch: true,
      // // Optional: Algolia search parameters
      // searchParameters: {},
      // // Optional: path for search page that enabled by default (`false` to disable it)
      // searchPagePath: 'search',
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
        // {to: '/blog', label: 'Blog', position: 'left'},
        {
            type: 'doc',
            docId: 'marketplace/intro',
            position: 'left',
            label: 'Guides'
          },
          {
            type: 'doc',
            docId: 'faq/faq',
            position: 'left',
            label: 'FAQs'
          },
          {
            type: 'doc',
            docId: 'developers/intro',
            position: 'left',
            label: 'Developers'
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
              label: 'Welcome',
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
              href: 'https://NCRB.world',
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
