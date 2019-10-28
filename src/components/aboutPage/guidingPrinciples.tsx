import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'

const GuidingPrinciples = () => {
  const data = useStaticQuery(graphql`
    query GuidingPrinciples {
      allWordpressWpGuidingPrinciples {
        edges {
          node {
            id
            content
            title
            featured_media {
              localFile {
                childImageSharp {
                  fluid(maxHeight: 281) {
                    ...GatsbyImageSharpFluid
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
    <div className="flex justify-around flex-wrap">
      {data.allWordpressWpGuidingPrinciples.edges.map(({ node: gp }, i) => (
        <div
          key={gp.id}
          className="sm:mx-4 mb-4 w-full max-w-400 flex flex-col bg-white guidingPrinciplesCard cardShadow"
        >
          <Img
            className="w-full h-64 responsiveGPImg"
            fixed={gp.featured_media.localFile.childImageSharp.fluid}
          />
          <div className="py-5 px-2 sm:p-5">
            <h3>Pillar {i + 1}</h3>
            <h5 className="-mt-3 mb-2 whitespace-no-wrap text-xl">
              {gp.title}
            </h5>
            <div
              className="text-darkGray leading-relaxed font-light"
              dangerouslySetInnerHTML={{ __html: gp.content }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default GuidingPrinciples
