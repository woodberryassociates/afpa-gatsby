import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'

const GuidingPrinciples = () => {
  const data = useStaticQuery(graphql`
    query GuidingPrinciples {
      allWordpressWpGuidingPrinciples {
        edges {
          node {
            content
            title
            featured_media {
              localFile {
                childImageSharp {
                  fixed(width: 400, height: 281) {
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
    <div className="flex justify-between">
      {data.allWordpressWpGuidingPrinciples.edges.map(
        ({ node, key }, index) => (
          <div key={key} className="flex flex-col bg-white">
            <Img fixed={node.featured_media.localFile.childImageSharp.fixed} />
            <h3>Pillar {index + 1}</h3>
            <h5>{node.title}</h5>
            <div dangerouslySetInnerHTML={{ __html: node.content }} />
          </div>
        )
      )}
    </div>
  )
}

export default GuidingPrinciples
