import { graphql, useStaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import React from 'react'

const FeaturedEvent = () => {
  const data = useStaticQuery(graphql`
    query FeaturedEvent {
      wordpressWpEvents(tags: { elemMatch: { slug: { eq: "featured" } } }) {
        title
        content
        acf {
          registration_link
        }
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
  `)

  return (
    <BackgroundImage
      className="featuredEventBackgroundImage" // TODO: tailwind classes aren't working
      fluid={[
        data.wordpressWpEvents.featured_media.localFile.childImageSharp.fluid,
        `linear-gradient(rgba(36, 43, 96, 0.79), rgba(36, 43, 96, 0.79))`,
      ].reverse()}
    >
      <div className="h-full w-full flex flex-col justify-center items-center">
        <div className="h-50 max-h-200 mr-24 max-w-md flex flex-col justify-between items-start">
          <h3>Coming up</h3>
          <h2
            className="text-white text-2xl leading-relaxed my-2"
            dangerouslySetInnerHTML={{ __html: data.wordpressWpEvents.title }}
          />
          <div
            className="text-white leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: data.wordpressWpEvents.content }}
          />
          <button>Register Now</button>
        </div>
      </div>
    </BackgroundImage>
  )
}

export default FeaturedEvent
