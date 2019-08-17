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
    <div>
      <div className="flex flex-wrap justify-between">
        {videos.map(({ key, node }) => (
          <div key={key} className="lg:w-1/4 p-4 flex flex-col">
            <ReactPlayer
              url={node.acf.url}
              light={true}
              playing={true}
              controls={false}
              width="300px"
              height="150px"
            />
            <h6 className="lg:w-300" dangerouslySetInnerHTML={{ __html: node.title }} />
            <div className="lg:w-300" dangerouslySetInnerHTML={{ __html: node.acf.description }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Videos
