import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import ReactPlayer from 'react-player'

const Videos = () => {
  const data = useStaticQuery(graphql`
    query Videos {
      allWordpressWpVideos(sort: { fields: date }) {
        edges {
          node {
            title
            acf {
              description
              url
            }
          }
        }
      }
    }
  `)

  const videos = data.allWordpressWpVideos.edges

  return (
    <div className="flex flex-wrap justify-between">
      {videos.map(({ key, node }) => (
        <div key={key} className="flex flex-col">
          <ReactPlayer url={node.acf.url} />
        </div>
      ))}
    </div>
  )
}

export default Videos
