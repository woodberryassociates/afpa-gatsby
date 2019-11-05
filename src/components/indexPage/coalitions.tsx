import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

const Coalitions = () => {
	const data = useStaticQuery(graphql`
		query Coalitions {
			allWordpressWpCoalitions {
				edges {
					node {
						id
						title
					}
				}
			}
		}
	`)

	return (
		<div className="flex flex-row flex-wrap justify-around">
			{data.allWordpressWpCoalitions.edges.map(({ node }) => (
				<div
					key={node.id}
					className="my-4 w-full sm:w-1/3 flex flex-col items-center"
				>
					<p
						className="max-w-2xs text-lg text-darkGray"
						dangerouslySetInnerHTML={{ __html: node.title }}
					/>
				</div>
			))}
		</div>
	)
}

export default Coalitions
