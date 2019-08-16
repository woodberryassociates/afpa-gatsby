import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'

const AnnualReports = () => {
  const data = useStaticQuery(graphql`
    query AnnualReports {
      allWordpressWpAnnualReports {
        edges {
          node {
            featured_media {
              localFile {
                childImageSharp {
                  fixed(width: 635, height: 821) {
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
    <div className="flex justify-around">
      {data.allWordpressWpAnnualReports.edges.map(({ key, node }) => (
        <Img
          key={key}
          className="m-10 shadow-lg"
          fixed={node.featured_media.localFile.childImageSharp.fixed}
        />
      ))}
    </div>
  )
}

export default AnnualReports
