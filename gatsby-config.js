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
        protocol: `http`,
        hostingWPCOM: false,
        useACF: false, // TODO(?)
        // searchAndReplaceContentUrls: {
        //   sourceUrl: "https://wcldn2018talk.wpengine.com",
        //   replacementUrl: "https://wpheadless.indigotree.co.uk",
        // },
        includedRoutes: [
          '**/sliders',
          '**/working-groups',
          '**/coalitions',
          '**/events',
          // '**/posts',
          '**/pages',
          '**/media',
          // '**/categories',
          '**/tags',
          // '**/taxonomies',
        ],
      },
    },
    `gatsby-plugin-typescript`,
    `gatsby-plugin-tslint`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
