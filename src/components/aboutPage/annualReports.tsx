import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'

const AnnualReports = () => {
	const data = useStaticQuery(graphql`
		query AnnualReports {
			allWordpressWpAnnualReports {
				edges {
					node {
						id
						acf {
							link
						}
						featured_media {
							localFile {
								childImageSharp {
									fluid(maxWidth: 635) {
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
		<div className="flex flex-col">
			<div className="flex flex-wrap justify-around">
				{data.allWordpressWpAnnualReports.edges.map(({ node: report }) => (
					<a href={report.acf.link}>
						<Img
							key={report.id}
							className="w-56 h-64 md:w-500 md:h-600 m-10 shadow-lg"
							fixed={report.featured_media.localFile.childImageSharp.fluid}
						/>
					</a>
				))}
			</div>

			{/* <button className="self-center mt-10">See More</button> */}
		</div>
	)
}

export default AnnualReports
