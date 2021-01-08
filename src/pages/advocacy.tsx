import React from 'react'

import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { OutboundLink } from 'gatsby-plugin-google-gtag'

import Layout from '../components/layout'
import SEO from '../components/seo'

const AdvocacyPage = ({ data }) => {
	const page = data.wordpressPage
	const regFields = data.allWordpressWpRegulatoryAdvocacy.edges

	const fedIssues: any[] = []
	const fedIssueArr: string[] = [] // iterable for JSX map function
	const stateIssues: any[] = []
	const stateIssueArr: string[] = [] // iterable for JSX map function

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

				{/* LEGISLATIVE ADVOCACY */}
				<section>
					<div className="flex flex-wrap justify-center md:justify-end">
						<div className="w-1/2 mb-4 md:mb-0 md:w-1/4 pr-5">
							<Img fluid={data.imgLegislative.childImageSharp.fluid} />
						</div>

						{/* Federal */}
						{fedIssueArr ? ( // ? .length was being used here but not sure if it's necessary (check this when re-adding these posts)
							<div className="w-3/4">
								<div className="flex items-center">
									<p className="mr-4 text-textGreen font-medium">FEDERAL</p>
									<div className="h-2px w-full bg-textGreen" />
								</div>

								<div className="flex flex-wrap items-start justify-between">
									{fedIssueArr.map(el => (
										<div key={el} className="md:w-5/12 mt-4">
											{/* Issue Name */}
											<h5 className="mb-0">{el.split(`\\\\`)[0]}</h5>
											{/* Description */}
											<p
												className="mb-2 advocacyTag"
												dangerouslySetInnerHTML={{
													__html: el.split(`\\\\`)[1],
												}}
											/>
											<div className="h-px w-full bg-backgroundGray" />
											{fedIssues[el].map((issue: any) => (
												<div key={issue.id} className="my-3">
													<p
														dangerouslySetInnerHTML={{ __html: issue.title }}
													/>
													<div className="flex justify-between">
														{issue.acf.link_1 ? (
															<OutboundLink
																target="_blank"
																href={issue.acf.link_1}
																className="text-sm text-lightBlue"
															>
																{issue.acf.link_1_text}
															</OutboundLink>
														) : null}
														{issue.acf.link_2 ? (
															<OutboundLink
																target="_blank"
																href={issue.acf.link_2}
																className="text-sm text-lightBlue"
															>
																{issue.acf.link_2_text}
															</OutboundLink>
														) : null}
													</div>
												</div>
											))}
										</div>
									))}
								</div>
							</div>
						) : null}

						{/* State */}
						{stateIssueArr ? (
							<div className="w-3/4">
								<div className="flex items-center">
									<p className="mr-4 text-textGreen font-medium">STATE</p>
									<div className="h-2px w-full bg-textGreen" />
								</div>

								<div className="flex flex-wrap items-start justify-between">
									{stateIssueArr.map(el => (
										<div key={el} className="md:w-5/12 mt-4">
											{/* Issue Name */}
											<h5 className="mb-0">{el.split(`\\\\`)[0]}</h5>
											{/* Description */}
											<p
												className="mb-2 advocacyTag	"
												dangerouslySetInnerHTML={{
													__html: el.split(`\\\\`)[1],
												}}
											/>
											<div className="h-px w-full bg-backgroundGray" />
											{stateIssues[el].map((issue: any) => (
												<div key={issue.id} className="my-5">
													<p
														dangerouslySetInnerHTML={{ __html: issue.title }}
													/>
													<div className="flex justify-between">
														{issue.acf.link_1 ? (
															<OutboundLink
																target="_blank"
																href={issue.acf.link_1}
																className="text-sm text-lightBlue"
															>
																{issue.acf.link_1_text}
															</OutboundLink>
														) : null}
														{issue.acf.link_2 ? (
															<OutboundLink
																target="_blank"
																href={issue.acf.link_2}
																className="text-sm text-lightBlue"
															>
																{issue.acf.link_2_text}
															</OutboundLink>
														) : null}
													</div>
												</div>
											))}
										</div>
									))}
								</div>
							</div>
						) : null}
					</div>
				</section>

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
	query LegislativeAdvocacy {
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
