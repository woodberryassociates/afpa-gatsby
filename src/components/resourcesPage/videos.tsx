import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import ReactPlayer from 'react-player'
import pagination from './pagination'

const Videos = () => {
  const data = useStaticQuery(graphql`
    query Videos {
      allWordpressWpVideos(sort: { fields: date }) {
        edges {
          node {
            id
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
  // const videos = pagination(data.allWordpressWpVideos.edges, 8)
  const videos3 = [videos, videos]

  return (
    <div className="flex flex-col items-center">
      {videos3.map((page, i) => (
        <div
          key={i + (page as any).length}
          className="max-w-1275 flex flex-wrap justify-center"
        >
          {(page as any).map(({ node: video }) => (
            <div key={video.id} className="flex justify-center">
              <div className="w-300 m-2 flex flex-col bg-white shadow">
                <ReactPlayer
                  url={video.acf.url}
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
                    dangerouslySetInnerHTML={{ __html: video.title }}
                  />
                  <div
                    className="font-light text-lighterGray"
                    dangerouslySetInnerHTML={{ __html: video.acf.coalition }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      <h5>TODO: Pagination</h5>
    </div>
  )
}

export default Videos
