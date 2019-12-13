import { graphql, Link, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'

const WorkingGroups = () => {
	const data = useStaticQuery(graphql`
		query WorkingGroups {
			allWordpressWpWorkingGroups(sort: { order: ASC, fields: title }) {
				edges {
					node {
						id
						title
						featured_media {
							localFile {
								childImageSharp {
									fixed(width: 300) {
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

	return (
		<div className="flex flex-row flex-wrap justify-around">
			{data.allWordpressWpWorkingGroups.edges.map(({ node }) => (
				<div key={node.id} />
				// <Link
				// 	to={node.acf.link}
				// 	key={node.id}
				// 	className="my-5 w-full lg:w-1/2 xl:w-1/3"
				// >
				// 	{/* <Img fixed={node.featured_media.localFile.childImageSharp.fixed} /> */}
				// </Link>
			))}
		</div>
	)
}

export default WorkingGroups
