import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'

const WorkingGroups = () => {
  const data = useStaticQuery(graphql`
    query WorkingGroups {
      allWordpressWpWorkingGroups {
        edges {
          node {
            id
            title
            featured_media {
              localFile {
                childImageSharp {
                  fixed(width: 91) {
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
      {data.allWordpressWpWorkingGroups.edges.map(({ node }) => (
        <div
          className="my-5 w-full xxs:w-1/2 xs:w-1/3 flex flex-col xl:flex-row items-center"
          // style={{ transform: 'translateX(25%)' }}
          key={node.id}
        >
          <Img
            className="min-w-91 ml-0 xl:ml-16"
            fixed={node.featured_media.localFile.childImageSharp.fixed}
          />
          <p
            className="xl:ml-5 max-w-2xs text-lg text-darkGray xl:text-left"
            dangerouslySetInnerHTML={{ __html: node.title }}
          />
        </div>
      ))}
    </div>
  )
}

export default WorkingGroups
