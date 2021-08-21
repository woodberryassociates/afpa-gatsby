import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'

const IcerSpeakers = ({ className }) => {
	const { speakers } = useStaticQuery(graphql`
		query IcerSpeakers {
			speakers: allWordpressWpIcerSpeakers {
				edges {
					node {
						id
						title
						acf {
							bio
						}
						img: featured_media {
							localFile {
								childImageSharp {
									fluid(maxWidth: 150, maxHeight: 150) {
										...GatsbyImageSharpFluid
									}
								}
							}
						}
					}
				}
			}
		}
	`)

	return (
		<div className={className}>
			<h5>Featured Speakers</h5>

			{speakers.edges.map(({ node: { title, acf: { bio }, img } }) => (
				<div className="mb-4 grid grid-cols-3 col-gap-3">
					{img ? (
						<div>
							<Img fluid={img.localFile.childImageSharp.fluid} />
						</div>
					) : null}

					<div className="col-span-2">
						<h6 className="mt-0">{title}</h6>
						<p>{bio}</p>
					</div>
				</div>
			))}
		</div>
	)
}

export default IcerSpeakers
