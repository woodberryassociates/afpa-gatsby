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

  return data.allWordpressWpEvents.edges.map(({ key, node }) => (
    <BackgroundImage
      className="backgroundImage" // TODO: tailwind styles aren't being applied correctly
      key={key}
      fluid={[
        node.featured_media.localFile.childImageSharp.fluid,
        `linear-gradient(rgba(36, 43, 96, 0.79), rgba(36, 43, 96, 0.79))`,
      ].reverse()}
    >
      <div className="flex flex-col justify-center h-full">
        <h2 dangerouslySetInnerHTML={{ __html: node.title }} />
        <p
          className="overflow-hidden"
          dangerouslySetInnerHTML={{ __html: node.content }}
        />
      </div>
    </BackgroundImage>
  ))
}

export default FeaturedEvent
