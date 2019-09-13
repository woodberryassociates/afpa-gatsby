import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'

const AnnualReports = () => {
  const data = useStaticQuery(graphql`
    query AnnualReports {
      allWordpressWpAnnualReports {
        edges {
          node {
            id
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
    <div className="flex flex-col">
      <div className="flex justify-around">
        {data.allWordpressWpAnnualReports.edges.map(({ node: report }) => (
          <Img
            key={report.id}
            className="m-10 shadow-lg"
            fixed={report.featured_media.localFile.childImageSharp.fixed}
          />
        ))}
      </div>

      <button className="self-center mt-10">See More</button>
    </div>
  )
}

export default AnnualReports
