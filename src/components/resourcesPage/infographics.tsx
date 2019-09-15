import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider, // TODO: add links to specific pages
  Dot,
  Slide as CarouselSlide,
  Slider as CarouselSlider,
} from 'pure-react-carousel'
import React from 'react'

/**
 * PAGINATION
 *
 * @TODO may be able to move this to gatsby-node & use graphql's
 * native functionality
 * https://nickymeuleman.netlify.com/blog/gatsby-pagination
 */
const pagination = (data, NUM_PER_PAGE) => {
  const tempArr: object[] = data
  const pagedArr: object[] = []

  // TODO: drop the for loop for a declarative/HO model
  for (let i = 0; i < tempArr.length; i += NUM_PER_PAGE)
    pagedArr.push(tempArr.slice(i, i + NUM_PER_PAGE))
  return pagedArr
}

const Infographics = () => {
  const data = useStaticQuery(graphql`
    query Infographics {
      allWordpressWpInfographics {
        edges {
          node {
            id
            acf {
              link
            }
            title
            featured_media {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 300) {
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
  const infographics: object[] = pagination(
    data.allWordpressWpInfographics.edges,
    6
  )

  return (
    <CarouselProvider
      className="w-full"
      naturalSlideWidth={1275}
      naturalSlideHeight={800}
      totalSlides={infographics.length}
    >
      <CarouselSlider>
        {infographics.map((page, i) => (
          <CarouselSlide
            className="pagedSlider"
            key={i + (page as any).length}
            index={i}
          >
            {(page as any).map(infographic => {
              infographic = infographic.node
              return (
                <div className="" key={infographic.id}>
                  <Img
                    className="max-h-335"
                    fluid={
                      infographic.featured_media.localFile.childImageSharp.fluid
                    }
                  />
                  <h5
                    className="text-darkGray"
                    dangerouslySetInnerHTML={{ __html: infographic.title }}
                  />
                </div>
              )
            })}
          </CarouselSlide>
        ))}
      </CarouselSlider>
      <div className="flex justify-center">
        <div className="w-64 relative bottom-100 flex justify-between">
          <ButtonBack>Back</ButtonBack>
          <ButtonNext>Next</ButtonNext>
        </div>
      </div>
    </CarouselProvider>
  )
}

export default Infographics
