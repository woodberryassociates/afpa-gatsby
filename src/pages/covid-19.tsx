import { graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import React from 'react'

import CovidResources from '../components/covidPage/covidResources'
import Layout from '../components/layout'
import SEO from '../components/seo'

const CovidPage = ({
	data: {
		page: { title, content, featured_media },
		featured,
	},
}) => (
	<Layout>
		<SEO title="COVID-19" />
		<div>
			{/* COVID Header */}
			<BackgroundImage
				className="max-h-500 md:min-h-500 flex items-center imgTop"
				fluid={[
					featured_media.localFile.childImageSharp.fluid,
					`linear-gradient(rgba(36, 43, 96, 0.79), rgba(36, 43, 96, 0.79))`,
				].reverse()}
			>
				<div>
					<div className="mx-2 lg:ml-64 max-w-md flex flex-col justify-between items-start">
						<h4
							className="text-white leading-normal"
							dangerouslySetInnerHTML={{ __html: featured.edges[0].node.title }}
						/>
						<p
							className="text-white leading-relaxed my-4 content"
							dangerouslySetInnerHTML={
								featured.edges[0].node.acf.author
									? { __html: featured.edges[0].node.acf.author }
									: { __html: `` }
							}
						/>
						<a href={featured.edges[0].node.acf.textLink}>
							<button>{featured.edges[0].node.acf.link_text}</button>
						</a>
					</div>
				</div>
			</BackgroundImage>

			<div className="mt-2 lg:mt-10 mb-10 mx-2 md:mx-32 xl:mx-64 pb-10">
				<h4 dangerouslySetInnerHTML={{ __html: title }} />
				<div className="content flex flex-col">
					<div dangerouslySetInnerHTML={{ __html: content }} />
				</div>
			</div>

			<CovidResources />
		</div>
	</Layout>
)

export const pageQuery = graphql`
	query CovidPageQuery {
		page: wordpressPage(title: { eq: "COVID-19" }) {
			id
			title
			content
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
		featured: allWordpressWpCovid19S(limit: 1) {
			edges {
				node {
					id
					title
					acf {
						author
						textLink
						link_text
					}
				}
			}
		}
	}
`

export default CovidPage
