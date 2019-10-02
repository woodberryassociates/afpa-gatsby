import { graphql, Link, useStaticQuery } from 'gatsby'
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
            id
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
    <div className="px-64 flex flex-row flex-wrap justify-center pb-64">
      {data.allWordpressWpHomeResources.edges.map(({ node }) => (
        <div
          className="md:w-1/3 lg:w-1/4 max-w-425 m-px p-5 bg-white flex flex-col items-center visible"
          key={node.id}
        >
          <div className="min-h-150 flex items-center">
            <Img fixed={node.featured_media.localFile.childImageSharp.fixed} />
          </div>
          <h5
            className="mt-5"
            dangerouslySetInnerHTML={{ __html: node.title }}
          />
          <div
            className="min-h-200 font-light"
            dangerouslySetInnerHTML={{ __html: node.content }}
          />
          {/* gatsby Link if local, otherwise anchor */}
          {node.acf.resource_url.substring(1) === '/' ? (
            <Link to={node.acf.resource_url}>
              <button className="darkButton">Explore More</button>
            </Link>
          ) : (
            <a href={node.acf.resource_url}>
              <button className="darkButton">Explore More</button>
            </a>
          )}
        </div>
      ))}
    </div>
  )
}

export default Resources
