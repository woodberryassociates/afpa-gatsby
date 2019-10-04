import { graphql, useStaticQuery } from 'gatsby'
import React, { useState } from 'react'
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
  const videos = pagination(data.allWordpressWpVideos.edges, 8)
  const [selectedPage, setSelectedPage] = useState(0)

  const goUp = (pageNum, arrLength, setPage) => {
    pageNum++
    if (pageNum === arrLength) pageNum = 0
    setPage(pageNum)
  }

  const goDown = (pageNum, arrLength, setPage) => {
    pageNum--
    if (pageNum === -1) pageNum = arrLength - 1
    setPage(pageNum)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-1275 flex flex-wrap justify-center">
        {videos[selectedPage].map(({ node: video }) => (
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

      <div className="flex mt-4">
        <button
          className="mx-2 w-32"
          onClick={() => goDown(selectedPage, videos.length, setSelectedPage)}
        >
          Back
        </button>
        <button
          className="mx-2 w-32"
          onClick={() => goUp(selectedPage, videos.length, setSelectedPage)}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Videos
