import { graphql, Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Surveys from '../components/surveysPage/surveys'

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
								featured.acf.blurb
									? { __html: featured.acf.blurb }
									: { __html: '' }
							}
						/>
						<div className="mb-6 inline text-white text-sm font-light tracking-wider uppercase">
							<span
								dangerouslySetInnerHTML={{
									__html: featured.acf.date.substring(11),
								}}
							/>
						</div>

						{/* Survey Link*/}
						<a className="mr-10 mb-2" href={featured.acf.link.link}>
							<button>View Survey</button>
						</a>
					</div>
				</div>
			</BackgroundImage>

			<Surveys />
		</div>
	</Layout>
)

export const pageQuery = graphql`
	query SurveyHubPageQuery {
		page: wordpressPage(title: { eq: "Surveys" }) {
			acf {
				header_text
			}
		}
		featured: wordpressWpSurveys(
			tags: { elemMatch: { slug: { eq: "featured-survey" } } }
		) {
			title
			acf {
				link {
					link
				}
				date
				blurb
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
`

export default SurveyHubPage
