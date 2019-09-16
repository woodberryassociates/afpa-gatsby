import { graphql, Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import React from 'react'

import Img from 'gatsby-image'
import Layout from '../components/layout'
import SEO from '../components/seo'

const EventCard = ({
  key,
  event: {
    node: {
      title,
      acf: { link, start_date, end_date, blurb },
      featured_media,
    },
  },
}) => (
  <div
    key={key}
    className="my-10 flex flex-wrap justify-between bg-white cardShadow"
  >
    <Img fixed={featured_media.localFile.childImageSharp.fixed} />

    <div className="m-5 lg:w-1/2">
      {/* Date */}
      <div className="mb-6 inline text-darkBlue text-sm font-medium tracking-wider uppercase">
        <span
          dangerouslySetInnerHTML={{
            __html: start_date,
          }}
        />
        {end_date ? (
          <>
            {` - `}
            <span
              dangerouslySetInnerHTML={{
                __html: end_date,
              }}
            />
          </>
        ) : null}
      </div>
      {/* Title */}
      <p
        dangerouslySetInnerHTML={{ __html: title }}
        className="my-2 text-xl text-lightBlue"
      />
      {/* Blurb */}
      <p dangerouslySetInnerHTML={{ __html: blurb }} className="text-sm" />
    </div>

    <a className="mr-10 self-center" href={link}>
      <button>Register Today</button>
    </a>
  </div>
)

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
          dangerouslySetInnerHTML={{ __html: date }}
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

const EventsPage = ({ data: { page, featured, current, past } }) => (
  <Layout>
    <SEO title="Events" />
    <div>
      {/* Featured Event Header */}
      <BackgroundImage
        className="min-h-500 flex items-center"
        fluid={[
          featured.featured_media.localFile.childImageSharp.fluid,
          `linear-gradient(rgba(36, 43, 96, 0.79), rgba(36, 43, 96, 0.79))`,
        ].reverse()}
      >
        <div>
          <div className="lg:ml-64 max-w-md flex flex-col justify-between items-start">
            <h4
              className="text-white leading-normal"
              dangerouslySetInnerHTML={{ __html: featured.title }}
            />
            <p
              className="text-white leading-relaxed my-4 content"
              dangerouslySetInnerHTML={
                featured.acf.excerpt
                  ? { __html: featured.acf.excerpt }
                  : { __html: featured.acf.blurb }
              }
            />
            <div className="mb-6 inline text-white text-sm font-light tracking-wider uppercase">
              <span
                dangerouslySetInnerHTML={{
                  __html: featured.acf.start_date,
                }}
              />
              {featured.acf.end_date ? (
                <>
                  {` - `}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: featured.acf.end_date,
                    }}
                  />
                </>
              ) : null}
            </div>
            <button>Register Now</button>
          </div>
        </div>
      </BackgroundImage>

      {/* Upcoming Events */}
      <div className="lg:px-64 pt-10 pb-32 bg-backgroundLightGray leftBottomTilt">
        <h5>Upcoming Events</h5>
        {current.edges.map(event => (
          <EventCard key={event.node.id} event={event} />
        ))}
      </div>

      {/* Past Events Gallery */}
      <div className="-mt-32 lg:px-64 pt-32 pb-64 bg-darkBlue leftTopTilt flex flex-col items-center">
        <h4 className="text-white">Past Events Gallery</h4>
        <p
          className="mb-10 content text-white"
          dangerouslySetInnerHTML={{ __html: page.acf.past_events }}
        />
        <div className="mb-10 flex flex-wrap content-center">
          {past.edges.map(event => (
            <PastEventCard key={event.node.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  </Layout>
)

export const pageQuery = graphql`
  query EventsQuery {
    page: wordpressPage(title: { eq: "Events" }) {
      acf {
        header_text
        past_events
      }
    }
    featured: wordpressWpEvents(
      tags: { elemMatch: { slug: { eq: "featured-event" } } }
    ) {
      title
      acf {
        link
        start_date
        end_date
        blurb
        excerpt
      }
      featured_media {
        localFile {
          childImageSharp {
            fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    past: allWordpressWpEvents(
      filter: { tags: { elemMatch: { slug: { eq: "past-event" } } } }
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
    current: allWordpressWpEvents(
      filter: { tags: { elemMatch: { slug: { ne: "past-event" } } } }
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
                fixed(width: 300, height: 200) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`

export default EventsPage
