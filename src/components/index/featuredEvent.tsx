import { graphql, useStaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import React from 'react'
import '../../global.styl'

// (
// 	filter: { tags: { elemMatch: { slug: { eq: "featured" } } } }
// )
const FeaturedEvent = () => {
  const data = useStaticQuery(graphql`
    query FeaturedEvent {
      allWordpressWpEvents(
        filter: { tags: { elemMatch: { slug: { eq: "featured" } } } }
      ) {
        edges {
          node {
            title
            content
            featured_media {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 960) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const nodes = data.allWordpressWpEvents.edges.map(({ key, node }) => (
    <BackgroundImage
      key={key}
      fluid={node.featured_media.localFile.childImageSharp.fluid}
    />
  ))

  return data.allWordpressWpEvents.edges.map(({ key, node }) => (
    <BackgroundImage
      style={{ width: '50%' }} // for some reason, tailwind styles aren't working
      key={key}
      fluid={[
        node.featured_media.localFile.childImageSharp.fluid,
        `linear-gradient(rgba(36, 43, 96, 0.79), rgba(36, 43, 96, 0.79))`,
      ].reverse()}
    >
      <div className="overflow-hidden">hello world</div>
    </BackgroundImage>
  ))
}

export default FeaturedEvent
