import { graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Surveys from '../components/surveysPage/surveys'
import { surveyLogo } from '../images'

const SurveyHubPage = ({ data: { page, featured, current, past } }) => (
	<Layout>
		<SEO title="Surveys" />
		<div>
			{/* Featured Survey Header */}
			<BackgroundImage
				className="max-h-500 md:max-h-500 flex items-center imgTop"
				fluid={[
					page.featured_media.localFile.childImageSharp.fluid,
					`linear-gradient(rgba(36, 43, 96, 0.5), rgba(36, 43, 96, 0.5))`,
				].reverse()}
			>
				<img
					alt="Surveys Logo"
					src={surveyLogo}
					className="w-1/2 my-0 m-auto"
				/>
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
		featured: wordpressWpSurveys(
			tags: { elemMatch: { slug: { eq: "featured-survey" } } }
		) {
			title
			acf {
				textLink
				date
				blurb
			}
		}
	}
`

export default SurveyHubPage
