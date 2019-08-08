/* eslint-disable no-undef */
module.exports = {
  siteMetadata: {
    title: `Alliance for Patient Access`,
    description: `Alliance for Patient Access is a national network of physicians dedicated to ensuring patient access to approved therapies and appropriate clinical care.`,
    author: `@avinerenberg`,
  },
  plugins: [
    // `gatsby-plugin-stylus`, // TODO: rm lib
    {
      resolve: `gatsby-plugin-stylus-resources`,
      options: {
        resources: ['./src/global.styl'],
        postCssPlugins: [require('tailwindcss')],
      },
    },
    `gatsby-plugin-purgecss`,
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
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        baseUrl: `afpa.staging.wpengine.com`,
        protocol: `https`,
        hostingWPCOM: false,
        useACF: false, // TODO: returned 404
        // concurrentRequests: 10,
        // searchAndReplaceContentUrls: {
        //   sourceUrl: "https://wcldn2018talk.wpengine.com",
        //   replacementUrl: "https://wpheadless.indigotree.co.uk",
        // },
        includedRoutes: [
          '**/posts',
          '**/pages',
          // '**/media',
          // '**/categories',
          // '**/tags',
          // '**/taxonomies',
        ],
      },
    },
    `gatsby-plugin-tslint`,
    `gatsby-plugin-typescript`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
