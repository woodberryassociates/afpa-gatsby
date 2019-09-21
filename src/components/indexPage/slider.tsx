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

const Slide = ({ slide }) => (
  <CarouselSlide index={slide.id}>
    <Img
      className="h-in max-h-3/4"
      fluid={slide.featured_media.localFile.childImageSharp.fluid}
    />
    <div className="absolute left-0 xs:left-1/10 top-0 xs:top-1/6 lg:top-1/10 xl:top-1/6 max-w-xl">
      <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight text-darkBlue my-3">
        {slide.title}
      </h1>
      <p
        className="text-base sm:text-lg lg:text-xl xl:text-2xl font-light leading-snug"
        dangerouslySetInnerHTML={{ __html: slide.content }}
      />
    </div>
  </CarouselSlide>
)

const Slider = () => {
  const data = useStaticQuery(graphql`
    query Sliders {
      allWordpressWpSliders {
        edges {
          node {
            id
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
      totalSlides={data.allWordpressWpSliders.edges.length}
      isPlaying={true}
    >
      <CarouselSlider>
        {data.allWordpressWpSliders.edges.map(({ node }) => (
          <Slide key={node.id} slide={node} />
        ))}
      </CarouselSlider>
      {/* <ButtonBack>Back</ButtonBack>
      <ButtonNext>Next</ButtonNext> */}
    </CarouselProvider>
  )
}

export default Slider
