import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slide,
  Slider,
} from 'pure-react-carousel'
// tslint:disable-next-line:no-submodule-imports
import 'pure-react-carousel/dist/react-carousel.es.css'
import React from 'react'

const Slide = ({ data }) => (
  <div className="relative">
    <Img
      className="object-fill max-h-3/4"
      fluid={data.featured_media.localFile.childImageSharp.fluid}
    />
    <div className="flex flex-col absolute top-1/6 left-1/6 max-w-xl">
      <h1 className="text-7xl leading-tight text-darkBlue my-3">
        {data.title}
      </h1>
      <p
        className="text-2xl font-light leading-snug"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </div>
  </div>
)

const Slider = () => {
  const data = useStaticQuery(graphql`
    query Sliders {
      allWordpressWpSliders {
        edges {
          node {
            content
            title
            featured_media {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1920) {
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
    <div className="">
      {data.allWordpressWpSliders.edges.map(({ key, node }) => (
        <Slide key={key} data={node} />
      ))}
    </div>
  )
}

export default Slider
