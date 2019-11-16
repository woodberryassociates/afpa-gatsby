import { graphql, Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import React from 'react'

// import PastSurveysGallery from '../components/eventsPage/pastSurveys'
// import UpcomingSurveys from '../components/eventsPage/upcomingSurveys'
import Layout from '../components/layout'
import SEO from '../components/seo'

const SurveyHubPage = ({ data: { page, featured, current, past } }) => (
	<Layout>
		<SEO title="Surveys" />
		<div>
			{/* Featured Survey Header */}
			<BackgroundImage
				className="min-h-500 flex items-center"
				fluid={[
					featured.featured_media.localFile.childImageSharp.fluid,
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
								featured.acf.excerpt
									? { __html: featured.acf.excerpt }
									: { __html: featured.acf.blurb }
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

			{/* <UpcomingSurveys /> */}

			<div className="-mt-32 lg:px-64 pt-32 pb-64 bg-darkBlue leftTopTilt flex flex-col items-center">
				<h4 className="text-white">Past Surveys Gallery</h4>
				<p
					className="mx-2 mb-10 content text-white"
					dangerouslySetInnerHTML={{ __html: page.acf.past_events }}
				/>
				{/* <PastSurveysGallery /> */}
			</div>
		</div>
	</Layout>
)

// export const pageQuery = graphql`
// 	query SurveyHubPageQuery {
// 		page: wordpressPage(title: { eq: "Surveys" }) {
// 			acf {
// 				header_text
// 				past_events
// 			}
// 		}
// 		featured: wordpressWpSurveys(
// 			tags: { elemMatch: { slug: { eq: "featured-event" } } }
// 		) {
// 			title
// 			acf {
// 				link
// 				start_date
// 				end_date
// 				blurb
// 				excerpt
// 			}
// 			featured_media {
// 				localFile {
// 					childImageSharp {
// 						fluid(maxWidth: 1920) {
// 							...GatsbyImageSharpFluid
// 						}
// 					}
// 				}
// 			}
// 		}
// 	}
// `

export default SurveyHubPage
