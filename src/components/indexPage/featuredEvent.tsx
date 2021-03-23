import React from 'react'

import { graphql, useStaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import { OutboundLink } from 'gatsby-plugin-google-gtag'

const FeaturedEvent = () => {
	const data = useStaticQuery(graphql`
		query FeaturedEvent {
			event: wordpressWpEvents(
				tags: { elemMatch: { slug: { eq: "featured-event" } } }
			) {
				title
				acf {
					blurb
					textLink
				}
				featured_media {
					localFile {
						childImageSharp {
							fluid(maxWidth: 960) {
								...GatsbyImageSharpFluid
							}
						}
					}
				}
			}
		}
	`)

	return (
		<BackgroundImage
			className="indexPageFeaturedEventBackgroundImage" // TODO: tailwind classes aren't working
			fluid={[
				data.event.featured_media.localFile.childImageSharp.fluid,
				`linear-gradient(rgba(36, 43, 96, 0.79), rgba(36, 43, 96, 0.79))`,
			].reverse()}
		>
			<div className="h-full w-full px-2 flex flex-col justify-center items-center">
				<div className="max-w-md mr-0 lg:mr-24 flex flex-col justify-between items-start">
					<h3>Coming up</h3>
					<h2
						className="text-white text-2xl leading-relaxed my-2"
						dangerouslySetInnerHTML={{ __html: data.event.title }}
					/>
					<div
						className="text-white leading-relaxed mb-4"
						dangerouslySetInnerHTML={{
							__html: data.event.acf.blurb,
						}}
					/>
					<OutboundLink target="_blank" href={data.event.acf.textLink}>
						<button>Register Now</button>
					</OutboundLink>
				</div>
			</div>
		</BackgroundImage>
	)
}

export default FeaturedEvent
