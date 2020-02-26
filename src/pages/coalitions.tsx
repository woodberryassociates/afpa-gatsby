import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const Coalitions = ({
	data: { allWordpressWpCoalitions: coalitions, wordpressPage: page },
}) => (
	<Layout>
		<SEO title="Coalitions & Affiliates" />
		{console.log(coalitions)}
		{/* Loop through the array twice, and filter by category in each loop. */}
		{/* AfPA Coalitions */}
		<div className="mb-10 px-2 sm:px-16 md:px-32 xl:px-64 content">
			<h4>Coalitions</h4>
			<p dangerouslySetInnerHTML={{ __html: page.acf.coalitions_text }} />
			{coalitions.edges.map(({ node: coalition }) =>
				coalition.categories && coalition.categories[0].slug === `coalition` ? (
					<div
						key={coalition.id}
						className="my-10 flex flex-col sm:flex-row items-center"
					>
						{coalition.featured_media ? (
							<a href={coalition.acf.coalition_link} className="self-center">
								<Img
									className="sm:mr-6 my-5 sm:my-0"
									fixed={
										coalition.featured_media.localFile.childImageSharp.fixed
									}
								/>
							</a>
						) : null}
						<p
							dangerouslySetInnerHTML={{ __html: coalition.acf.blurb }}
							className="text-center sm:text-left"
							style={{ margin: `0` }}
						/>
					</div>
				) : null
			)}
		</div>

		{/* AfPA Affiliates */}
		<div className="mb-64 px-2 sm:px-16 md:px-32 xl:px-64 content">
			<h4>Affiliates</h4>
			<p dangerouslySetInnerHTML={{ __html: page.acf.affiliates_text }} />
			{coalitions.edges.map(({ node: coalition }) =>
				coalition.categories && coalition.categories[0].slug === `affiliate` ? (
					<div
						key={coalition.id}
						className="my-10 flex flex-col sm:flex-row items-center"
					>
						{coalition.featured_media ? (
							<a href={coalition.acf.coalition_link} className="self-center">
								<Img
									className="sm:mr-6 my-5 sm:my-0"
									fixed={
										coalition.featured_media.localFile.childImageSharp.fixed
									}
								/>
							</a>
						) : null}
						<p
							dangerouslySetInnerHTML={{ __html: coalition.acf.blurb }}
							className="text-center sm:text-left"
							style={{ margin: `0` }}
						/>
					</div>
				) : null
			)}
		</div>
	</Layout>
)

export const pageQuery = graphql`
	query Coalitions {
		wordpressPage(title: { eq: "Coalitions" }) {
			id
			title
			acf {
				header_text
				coalitions_text
				affiliates_text
			}
		}
		allWordpressWpCoalitions {
			edges {
				node {
					id
					acf {
						blurb
						coalition_link
					}
					categories {
						slug
					}
					featured_media {
						localFile {
							childImageSharp {
								fixed(width: 200) {
									...GatsbyImageSharpFixed
								}
							}
						}
					}
				}
			}
		}
	}
`

export default Coalitions
