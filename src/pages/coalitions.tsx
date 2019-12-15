import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const Coalitions = ({
	data: { allWordpressWpCoalitions: coalitions, wordpressPage: page },
}) => (
	<Layout>
		<SEO title="Coaltions" />
		<div className="mb-64 px-2 sm:px-16 md:px-32 xl:px-64 content">
			<h4>{page.title}</h4>
			<p dangerouslySetInnerHTML={{ __html: page.acf.header_text }} />
			{coalitions.edges.map(({ node: coalition }) => (
				<div
					key={coalition.id}
					className="mt-2 flex flex-col sm:flex-row justify-center"
				>
					{coalition.featured_media ? (
						<a href={coalition.acf.coalition_link} className="self-center">
							<Img
								className="sm:mr-6 my-5 sm:my-0"
								fixed={coalition.featured_media.localFile.childImageSharp.fixed}
							/>
						</a>
					) : null}
					<p
						dangerouslySetInnerHTML={{ __html: coalition.acf.blurb }}
						className="text-center sm:text-left"
					/>
				</div>
			))}
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
