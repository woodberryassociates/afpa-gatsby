import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import Parser from 'rss-parser'

const parser = new Parser()
const podcastsResolver = async () => {
  const feed = await parser.parseURL(
    `https://patientaccess.cast.rocks/feed.xml`
  )

  const items = (feed as any).items.map((item, key) => (
    <div key={key}>{item}</div>
  ))

  return items
}

const Podcasts = () => {
  // const data = useStaticQuery(graphql`
  //   query Podcasts {
  //     allWordpressWpVideos(sort: { fields: date }) {
  //       edges {
  //         node {
  //           title
  //           date(formatString: "MMMM YYYY")
  //           acf {
  //             coalition
  //             url
  //           }
  //         }
  //       }
  //     }
  //   }
  // `)

  return <div /> // podcastsResolver
}

export default Podcasts
