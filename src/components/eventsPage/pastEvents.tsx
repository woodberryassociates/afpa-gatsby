import { graphql, useStaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import React from 'react'

const PastEventCard = ({
  key,
  event: {
    node: {
      title,
      acf: { link, start_date: date },
      featured_media,
    },
  },
}) => (
  <div key={key} className="">
    <BackgroundImage
      className="m-6 h-400 w-500 flex items-end"
      fluid={[
        featured_media.localFile.childImageSharp.fluid,
        `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))`,
      ].reverse()}
    >
      <div className="m-4 flex flex-col text-white">
        {/*  Date */}
        <p
          dangerouslySetInnerHTML={{ __html: date.substring(11).split('@')[0] }}
          className="text-sm font-medium tracking-wider uppercase"
        />
        {/* Title */}
        <p
          dangerouslySetInnerHTML={{ __html: title }}
          className="my-2 text-xl"
        />
        {/* Link */}
        <a href={link} className="text-xs">
          See photos >>
        </a>
      </div>
    </BackgroundImage>
  </div>
)

const PastEventsGallery = () => {
  const data = useStaticQuery(graphql`
    query PastEventsQuery {
      past: allWordpressWpEvents(
        filter: { tags: { elemMatch: { slug: { eq: "past-event" } } } }
        sort: { fields: acf___start_date, order: DESC }
      ) {
        edges {
          node {
            id
            title
            acf {
              link
              start_date
              end_date
              blurb
            }
            featured_media {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 500) {
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

  return (
    <div className="mb-10 flex flex-wrap justify-center">
      {data.past.edges.map(event => (
        <PastEventCard key={event.node.id} event={event} />
      ))}
    </div>
  )
}

export default PastEventsGallery
