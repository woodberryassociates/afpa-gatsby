// tslint:disable-next-line:no-submodule-imports
import 'pure-react-carousel/dist/react-carousel.es.css'

import React from 'react'

import { graphql, useStaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import {
	CarouselProvider,
	Slide as CarouselSlide,
	Slider as CarouselSlider,
} from 'pure-react-carousel'

const Slide = ({ slide }) => (
	<CarouselSlide index={slide.id}>
		<BackgroundImage
			fluid={slide.featured_media.localFile.childImageSharp.fluid}
			className="h-full"
		>
			{slide.acf.link ? (
				<a
					href={slide.acf.link}
					className="absolute bottom-0 ml-2 mb-2 md:ml-12 md:mb-12"
				>
					<button className="p-2 sm:py-3 sm:px-8 text-sm sm:text-base">
						{slide.acf.link_text}
					</button>
				</a>
			) : null}
		</BackgroundImage>
	</CarouselSlide>
)

const Slider = () => {
	const data = useStaticQuery(graphql`
		query HomepageSlider {
			allWordpressWpSliders {
				edges {
					node {
						id
						title
						acf {
							blurb
							link
							link_text
						}
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
			naturalSlideHeight={800}
			totalSlides={data.allWordpressWpSliders.edges.length}
			isPlaying={true}
		>
			<CarouselSlider>
				{data.allWordpressWpSliders.edges.map(({ node }) => (
					<Slide key={node.id} slide={node} />
				))}
			</CarouselSlider>
		</CarouselProvider>
	)
}

export default Slider
