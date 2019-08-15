import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'

const Resources = () => {
  const data = useStaticQuery(graphql`
    query HomeResources {
      allWordpressWpHomeResources {
        edges {
          node {
            acf {
              resource_url
            }
            title
            content
            featured_media {
              localFile {
                childImageSharp {
                  fixed(width: 119) {
                    ...GatsbyImageSharpFixed
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
    <div className="px-64 flex flex-row flex-wrap justify-center">
      {data.allWordpressWpHomeResources.edges.map(({ key, node }) => (
        <div
          className="md:w-1/3 lg:w-1/4 max-w-425 m-px p-5 bg-white flex flex-col items-center visible"
          key={key}
        >
          <div className="min-h-150 flex items-center">
            <Img
              className=""
              fixed={node.featured_media.localFile.childImageSharp.fixed}
            />
          </div>
          <h5
            className="m-5 text-darkBlue text-lg"
            dangerouslySetInnerHTML={{ __html: node.title }}
          />
          <p
            className="min-h-200 font-light"
            dangerouslySetInnerHTML={{ __html: node.content }}
          />
          <button className="darkButton">Explore More</button>
        </div>
      ))}
    </div>
  )
}

export default Resources
