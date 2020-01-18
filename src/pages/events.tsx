import { graphql, Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import React from 'react'

import PastEventsGallery from '../components/eventsPage/pastEvents'
import UpcomingEvents from '../components/eventsPage/upcomingEvents'
import Layout from '../components/layout'
import SEO from '../components/seo'

const EventsPage = ({ data: { page, featured, current, past } }) => (
	<Layout>
		<SEO title="Events" />
		<div>
			{/* Featured Event Header */}
			<BackgroundImage
				className="min-h-500 flex items-center imgTop"
				fluid={[
					page.featured_media.localFile.childImageSharp.fluid,
					`linear-gradient(rgba(36, 43, 96, 0.79), rgba(36, 43, 96, 0.79))`,
				].reverse()}
			>
				<div>
					<div className="mx-2 lg:ml-64 max-w-md flex flex-col justify-between items-start">
						<h4
							className="text-white leading-normal"
							dangerouslySetInnerHTML={{ __html: featured.title }}
						/>
						<p
							className="text-white leading-relaxed my-4 content"
							dangerouslySetInnerHTML={
								featured.acf.blurb
									? { __html: featured.acf.blurb }
									: { __html: '' }
							}
						/>
						<div className="mb-6 inline text-white text-sm font-light tracking-wider uppercase">
							<span
								dangerouslySetInnerHTML={{
									__html: featured.acf.start_date.substring(11),
								}}
							/>
							{featured.acf.end_date ? (
								<>
									{` - `}
									<span
										dangerouslySetInnerHTML={{
											__html: featured.acf.end_date,
										}}
									/>
								</>
							) : null}
						</div>
						<button>Register Now</button>
					</div>
				</div>
			</BackgroundImage>

			<UpcomingEvents />

			<div className="-mt-32 pt-32 pb-64 xxxxl:px-64 bg-darkBlue leftTopTilt flex flex-col items-center">
				<h4 className="text-white">Past Events Gallery</h4>
				<p
					className="mx-2 mb-10 content text-white text-center"
					dangerouslySetInnerHTML={{ __html: page.acf.past_events }}
				/>
				<PastEventsGallery />
			</div>
		</div>
	</Layout>
)

export const pageQuery = graphql`
	query EventsPageQuery {
		page: wordpressPage(title: { eq: "Events" }) {
			acf {
				header_text
				past_events
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
		featured: wordpressWpEvents(
			tags: { elemMatch: { slug: { eq: "featured-event" } } }
		) {
			title
			acf {
				link
				start_date
				end_date
				blurb
			}
		}
	}
`

export default EventsPage
