import React from 'react'

import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { OutboundLink } from 'gatsby-plugin-google-gtag'

const Leadership = ({
	associateMembership: membership,
	associateMembershipLink: membershipLink,
}) => {
	const data = useStaticQuery(graphql`
		query Leadership {
			chairman: wordpressWpLeadership(
				tags: { elemMatch: { slug: { eq: "chairman" } } }
			) {
				title
				content
				acf {
					location
				}
				featured_media {
					localFile {
						childImageSharp {
							fixed(width: 400, height: 600) {
								...GatsbyImageSharpFixed
							}
						}
					}
				}
			}
			director: wordpressWpLeadership(
				tags: { elemMatch: { slug: { eq: "executive-director" } } }
			) {
				title
				content
				acf {
					location
				}
				featured_media {
					localFile {
						childImageSharp {
							fixed(width: 400, height: 600) {
								...GatsbyImageSharpFixed
							}
						}
					}
				}
			}
			allWordpressWpLeadership(
				filter: {
					tags: {
						elemMatch: { slug: { nin: ["chairman", "executive-director"] } }
					}
				}
			) {
				edges {
					node {
						id
						title
						content
						acf {
							location
						}
						featured_media {
							localFile {
								childImageSharp {
									fixed(width: 250, height: 300) {
										...GatsbyImageSharpFixed
									}
								}
							}
						}
					}
				}
			}
		}
	`)
	const leadership = data.allWordpressWpLeadership.edges

	return (
		<div className="flex flex-col justify-between items-center">
			{/* CHAIRMAN */}
			<div
				id="founder"
				className="my-10 flex justify-center items-center w-full"
			>
				<div className="h-px w-2/5 bg-lighterGray" />
				<h5 className="mx-4 text-afpaGreen text-center">Founder</h5>
				<div className="h-px w-2/5 bg-lighterGray" />
			</div>
			<div className="sm:mx-32 flex flex-col-reverse xl:flex-row justify-between items-center bg-white">
				<div className="w-2/3 p-2 xl:p-20 flex flex-col justify-center">
					<h5 className="leading-snug">{data.chairman.title}</h5>
					<h3 className="text-lightBlue leading-snug">
						{data.chairman.acf.location}
					</h3>
					<div
						className="my-3 font-light"
						dangerouslySetInnerHTML={{ __html: data.chairman.content }}
					/>
				</div>
				<Img
					className="responsiveChairmanImg"
					fixed={data.chairman.featured_media.localFile.childImageSharp.fixed}
				/>
			</div>

			{/* BOARD OF DIRECTORS */}
			<div className="mx-10 mt-16 mb-10 flex justify-center items-center w-full">
				<div className="h-px w-2/5 bg-lighterGray" />
				<h5 className="text-afpaGreen mx-4 text-center">Board of Directors</h5>
				<div className="h-px w-2/5 bg-lighterGray" />
			</div>
			<div className="flex flex-wrap justify-between">
				{leadership.map(({ node: member }) => (
					<div
						key={member.id}
						className="my-5 flex flex-wrap md:flex-no-wrap justify-center xl:w-1/2 leading-relaxed leadershipCard"
					>
						<Img
							fixed={member.featured_media.localFile.childImageSharp.fixed}
						/>
						<div className="w-2/3 mx-6 my-2">
							<h5 className="leading-snug text-white">{member.title}</h5>
							<h3 className="leading-snug text-lightBlue">
								{member.acf.location}
							</h3>
							<div
								className="my-3 text-white font-light"
								dangerouslySetInnerHTML={{ __html: member.content }}
							/>
						</div>
					</div>
				))}
			</div>

			{/* EXECUTIVE DIRECTOR */}
			<div
				id="chairman"
				className="my-10 flex justify-center items-center w-full"
			>
				<div className="h-px w-2/5 bg-lighterGray" />
				<h5 className="mx-4 text-afpaGreen text-center">Executive Director</h5>
				<div className="h-px w-2/5 bg-lighterGray" />
			</div>
			<div className="sm:mx-32 flex flex-col-reverse xl:flex-row justify-between items-center bg-white">
				<div className="w-2/3 p-2 xl:p-20 flex flex-col justify-center">
					<h5 className="leading-snug">{data.director.title}</h5>
					<h3 className="text-lightBlue leading-snug">
						{data.director.acf.location}
					</h3>
					<div
						className="my-3 font-light leadershipCard"
						dangerouslySetInnerHTML={{ __html: data.director.content }}
					/>
				</div>
				<Img
					className="responsiveChairmanImg"
					fixed={data.director.featured_media.localFile.childImageSharp.fixed}
				/>
			</div>

			<div
				id="membership"
				className="mx-10 mt-10 flex justify-center items-center w-full"
			>
				<div className="h-px w-1/3 bg-lighterGray" />
				<h5 className="text-afpaGreen text-center mx-4">
					Associate Membership in AfPA
				</h5>
				<div className="h-px w-1/3 bg-lighterGray" />
			</div>
			<p
				className="lg:w-2/3 my-10 text-white font-light text-sm leading-relaxed text-center"
				dangerouslySetInnerHTML={{ __html: membership }}
			/>
			<OutboundLink
				target="_blank"
				className="mb-16 text-lightBlue"
				href={membershipLink}
			>
				Financial support of AfPA and IfPA is acknowledged here.
			</OutboundLink>
		</div>
	)
}

export default Leadership
