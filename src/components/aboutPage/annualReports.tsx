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
			{/* TWO MOST RECENT REPORTS */}
			<div className="flex flex-wrap justify-around">
				{data.reports.edges.slice(0, 2).map(({ node: report }) => (
					<a href={report.acf.textLink} key={report.id}>
						<Img
							className="w-56 h-64 md:w-500 md:h-600 m-10 shadow-lg"
							fixed={report.featured_media.localFile.childImageSharp.fluid}
						/>
					</a>
				))}
			</div>

			{/* PRIOR REPORTS */}
			<div className="flex flex-wrap justify-around">
				{data.reports.edges.slice(2).map(({ node: report }) => (
					<a href={report.acf.textLink} key={report.id}>
						{report.title}
					</a>
				))}
			</div>
		</div>
	)
}

export default AnnualReports
