import React from 'react'

import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { OutboundLink } from 'gatsby-plugin-google-gtag'

import AnnualReports from '../components/aboutPage/annualReports'
import GuidingPrinciples from '../components/aboutPage/guidingPrinciples'
import Leadership from '../components/aboutPage/leadership'
import Layout from '../components/layout'
import SEO from '../components/seo'

const AboutPage = ({ data }) => {
	const page = data.wordpressPage

	return (
		<Layout>
			<SEO title="About" />
			<Img
				className="max-h-500"
				imgStyle={{ objectPosition: `top` }}
				fluid={page.featured_media.localFile.childImageSharp.fluid}
			/>

			<div className="mt-10 my-16 mx-2 lg:mx-32 xl:mx-64 flex flex-row">
				{/* Quick Links */}
				<div className="pt-2 mr-20 self-start top-0 hidden sm:block sticky whitespace-no-wrap">
					<h5>Quick Links</h5>
					<div className="h-1 mt-3 mb-4 w-full bg-darkBlue" />
					<ul>
						<li>
							<OutboundLink target="_blank" href="#about">
								<h3>About AFPA</h3>
							</OutboundLink>
							<div className="h-px my-4 w-full bg-backgroundGray" />
						</li>
						<li>
							<OutboundLink target="_blank" href="#annual-reports">
								<h3>Annual Reports</h3>
							</OutboundLink>
							<div className="h-px my-4 w-full bg-backgroundGray" />
						</li>
						<li>
							<OutboundLink target="_blank" href="#guiding-principles">
								<h3>Principles of Patient-Centered Care</h3>
							</OutboundLink>
							<div className="h-px my-4 w-full bg-backgroundGray" />
						</li>
						<li>
							<OutboundLink target="_blank" href="#chief-medical-officer">
								<h3>Chief Medical Officer</h3>
							</OutboundLink>
							<div className="h-px my-4 w-full bg-backgroundGray" />
						</li>
						<li>
							<OutboundLink target="_blank" href="#leadership">
								<h3>Leadership</h3>
							</OutboundLink>
							<div className="h-px my-4 w-full bg-backgroundGray" />
						</li>
						<li>
							<OutboundLink target="_blank" href="#membership">
								<h3>Transparency</h3>
							</OutboundLink>
						</li>
					</ul>
				</div>

				{/* About AfPA */}
				<div id="about" className="max-w-6xl">
					<h4>About AfPA</h4>
					<div
						className="content lastChildBoldDarkBlue"
						dangerouslySetInnerHTML={{ __html: page.content }}
					/>
					<p
						className="mt-10 italic text-darkBlue text-sm"
						dangerouslySetInnerHTML={{
							__html: page.acf.fine_print,
						}}
					/>
				</div>
			</div>

			{/* Annual Reports */}
			<div id="annual-reports" className="pb-64 flex flex-col items-center">
				<h4>Annual Reports</h4>
				<AnnualReports />
			</div>

			{/* Principles of Patient-Centered Care */}
			<div
				id="guiding-principles"
				className="-my-48 px-2 py-40 flex flex-col items-center bg-backgroundGray rightTilt"
			>
				<h4>Principles of Patient-Centered Care</h4>
				<p
					className="sectionSubHead max-w-650"
					dangerouslySetInnerHTML={{ __html: page.acf.guiding_principles }}
				/>
				<GuidingPrinciples />
			</div>

			{/* Leadership & Membership */}
			<div className="pt-64 px-32 flex flex-col items-center bg-darkBlue">
				<h4 id="leadership">Leadership</h4>
				<Leadership
					associateMembership={page.acf.associate_membership}
					associateMembershipLink={page.acf.assocLink}
				/>
			</div>

			<Img fluid={page.acf.membership_photo.localFile.childImageSharp.fluid} />
		</Layout>
	)
}

export const pageQuery = graphql`
	query AboutPage {
		wordpressPage(title: { eq: "About" }) {
			acf {
				fine_print
				annual_reports
				guiding_principles
				leadership
				associate_membership
				assocLink
				membership_photo {
					localFile {
						childImageSharp {
							fluid(maxWidth: 1920) {
								...GatsbyImageSharpFluid
							}
						}
					}
				}
			}
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
	}
`

export default AboutPage
