import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slide as CarouselSlide,
  Slider as CarouselSlider,
} from 'pure-react-carousel'
// tslint:disable-next-line:no-submodule-imports
import 'pure-react-carousel/dist/react-carousel.es.css'
import React from 'react'

const Slide = ({ key, data }) => (
  <CarouselSlide key={key} index={key}>
    <Img
      className="object-fill max-h-3/4"
      fluid={data.featured_media.localFile.childImageSharp.fluid}
    />
    <div className="flex flex-col absolute top-0 h-full max-w-xl">
      <div className="relative left-1/6 top-1/10 xl:top-1/6 xl:left-1/4">
        <h1 className="text-4xl lg:text-6xl xl:text-7xl leading-tight text-darkBlue my-3">
          {data.title}
        </h1>
        <p
          className="text-lg lg:text-xl xl:text-2xl font-light leading-snug"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </div>
    </div>
  </CarouselSlide>
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
    <CarouselProvider
      naturalSlideWidth={1920}
      naturalSlideHeight={700}
      totalSlides={3}
    >
      <CarouselSlider>
        {data.allWordpressWpSliders.edges.map(({ key, node }) => (
          <Slide key={key} data={node} />
        ))}
      </CarouselSlider>
      <ButtonBack>Back</ButtonBack>
      <ButtonNext>Next</ButtonNext>
    </CarouselProvider>
  )
}

export default Slider
