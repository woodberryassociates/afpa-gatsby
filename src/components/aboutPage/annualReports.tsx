import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'

const AnnualReports = () => {
	const data = useStaticQuery(graphql`
		query AnnualReports {
			reports: allWordpressWpAnnualReports(
				sort: { fields: title, order: DESC }
			) {
				edges {
					node {
						id
						acf {
							textLink
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
				{data.reports.edges.map(({ node: report }) => (
					<a href={report.acf.textLink} key={report.id}>
						<Img
							className="w-56 h-64 md:w-500 md:h-600 m-10 shadow-lg"
							fixed={report.featured_media.localFile.childImageSharp.fluid}
						/>
					</a>
				))}
			</div>
		</div>
	)
}

export default AnnualReports
