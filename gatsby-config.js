/* eslint-disable no-undef */
module.exports = {
  siteMetadata: {
    title: `Alliance for Patient Access`,
    description: `Alliance for Patient Access is a national network of physicians dedicated to ensuring patient access to approved therapies and appropriate clinical care.`,
    author: `@avinerenberg`,
  },
  plugins: [
    // {
    //   resolve: `gatsby-plugin-stylus-resources`,
    //   options: {
    //     resources: ['./src/global.styl'],
    //     postCssPlugins: [require('tailwindcss')],
    //   },
    // },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`tailwindcss`),
          require(`precss`),
          require(`postcss-easing-gradients`),
          require(`postcss-preset-env`),
        ],
      },
    },
    // `gatsby-plugin-purgecss`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `afpa-wordpress`,
        short_name: `afpa`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
    // {
    //   resolve: `gatsby-plugin-remote-images`,
    //   options: {
    //     nodeType: 'wordpressWpMedia',
    //     imagePath: 'edges.node.source_url',
    //     name: 'wpImage',
    //   },
    // },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        baseUrl: process.env.WP_ENV, // localhost or the remote URL
        protocol: process.env.WP_ENV === 'localhost/afpa' ? 'http' : 'https',
        hostingWPCOM: false,
        useACF: true, // TODO(?)
        // searchAndReplaceContentUrls: {
        //   sourceUrl: "",
        //   replacementUrl: "",
        // },
        includedRoutes: [
          // Home Page CPTs
          '**/sliders',
          '**/working-groups',
          '**/coalitions',
          '**/home-resources',

          // About Page CPTs
          '**/annual-reports',
          '**/guiding-principles',
          '**/leadership',

          // Resources Page CPTs
          '**/videos',
          '**/infographics',

          // Events Page (+ Home Page) CPT
          '**/events',

          // Advocacy Page CPT
          '**/legislative-advocacy',
          '**/regulatory-advocacy',

          // WP Core
          '**/pages',
          '**/media',
          '**/tags',
          '**/categories',
          // '**/taxonomies',
        ],
      },
    },
    `gatsby-plugin-typescript`,
    `gatsby-plugin-tslint`,
    `gatsby-plugin-offline`, // To learn more, visit: https://gatsby.dev/offline
  ],
}
