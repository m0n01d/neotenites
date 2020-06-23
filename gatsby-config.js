module.exports = {
  siteMetadata: {
    title: `neotenites`,
    description: `2 twentysomethings & 2 cats hitting the road.`,
    author: `@neotenites`
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: { trackingId: `UA-97080570-6` }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {}
          }
        ]
      }
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages-md`,
        path: `${__dirname}/src/pages/md`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog-md`,
        path: `${__dirname}/src/blog`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `neotenites`,
        short_name: `neotenites`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
        // @TODO config
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
