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
            date(formatString: "MMMM YYYY")
            acf {
              coalition
              url
            }
          }
        }
      }
    }
  `)

  const videos = data.allWordpressWpVideos.edges

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-1275 flex flex-wrap justify-center">
        {videos.map(({ key, node }) => (
          <div key={key} className="flex justify-center">
            <div className="w-300 m-2 flex flex-col bg-white shadow">
              <ReactPlayer
                url={node.acf.url}
                light={true}
                playing={true}
                controls={false}
                width="300px"
                height="150px"
                className=""
              />
              <div className="m-4">
                <h6
                  className="text-lg"
                  dangerouslySetInnerHTML={{ __html: node.title }}
                />
                <div
                  className="font-light text-lighterGray"
                  dangerouslySetInnerHTML={{ __html: node.acf.coalition }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <h5>TODO: Pagination</h5>
    </div>
  )
}

export default Videos
