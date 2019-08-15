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
    <div className="flex flex-row flex-wrap justify-around">
      {data.allWordpressWpHomeResources.edges.map(({ key, node }) => (
        <div className="w-1/3 my-5 flex flex-col items-center" key={key}>
          <Img
            className="min-w-91"
            fixed={node.featured_media.localFile.childImageSharp.fixed}
          />
          <h5
            className="ml-5 text-darkGray"
            dangerouslySetInnerHTML={{ __html: node.title }}
          />
          <p dangerouslySetInnerHTML={{ __html: node.content }} />
        </div>
      ))}
    </div>
  )
}

export default Resources
