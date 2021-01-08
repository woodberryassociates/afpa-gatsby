import React from 'react'

import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { OutboundLink } from 'gatsby-plugin-google-gtag'

import Layout from '../components/layout'
import SEO from '../components/seo'

const AdvocacyPage = ({ data }) => {
	const page = data.wordpressPage
	const regFields = data.allWordpressWpRegulatoryAdvocacy.edges

	return (
		<Layout>
			<SEO title="Advocacy" />
			<Img
				imgStyle={{ objectPosition: `top` }}
				fluid={page.featured_media.localFile.childImageSharp.fluid}
			/>

			<div className="mx-2 lg:mx-32 xl:mx-64 mt-10 pb-64">
				<header className="mb-12">
					<h4>Take Action</h4>
					<p
						className="content"
						dangerouslySetInnerHTML={{ __html: page.acf.header_text }}
					/>
				</header>

				{/* REGULATORY ADVOCACY */}
				<section className="mt-10 flex flex-wrap justify-center md:justify-end">
					<div className="w-1/2 mb-4 md:mb-0 md:w-1/4 pr-5">
						<Img fluid={data.imgRegulatory.childImageSharp.fluid} />
					</div>

					<div className="w-3/4">
						<div
							className="content mb-5"
							dangerouslySetInnerHTML={{ __html: page.acf.regulatory_text }}
						/>
						{regFields.map(el => (
							<p key={el.node.id} className="my-2 text-lightBlue text-sm">
								<OutboundLink target="_blank" href={el.node.acf.link}>
									{el.node.title}
								</OutboundLink>
							</p>
						))}
					</div>
				</section>
			</div>
		</Layout>
	)
}

export const pageQuery = graphql`
	query Advocacy {
		allWordpressWpRegulatoryAdvocacy {
			edges {
				node {
					id
					title
					acf {
						link
					}
				}
			}
		}
		wordpressPage(slug: { eq: "advocacy" }) {
			acf {
				header_text
				regulatory_text
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
		imgLegislative: file(relativePath: { eq: "afpa-legislative.png" }) {
			childImageSharp {
				fluid(maxWidth: 350) {
					...GatsbyImageSharpFluid
				}
			}
		}
		imgRegulatory: file(relativePath: { eq: "afpa-regulatory.png" }) {
			childImageSharp {
				fluid(maxWidth: 350) {
					...GatsbyImageSharpFluid
				}
			}
		}
	}
`

export default AdvocacyPage
