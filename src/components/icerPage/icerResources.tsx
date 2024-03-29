import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import ResourceCard from '../resourceCard'

const IcerResources = () => {
	const { resources } = useStaticQuery(graphql`
		query IcerResources {
			resources: allWordpressWpIcerResources {
				edges {
					node {
						id
						title
						acf {
							author
							textLink
							link_text
						}
						featured_media {
							localFile {
								childImageSharp {
									fixed(width: 300, height: 200) {
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
		<div className="px-2 md:px-32 lg:px-64 pt-10 pb-64 bg-backgroundLightGray leftBottomTilt">
			<h5>Featured Resources</h5>
			{resources.edges.map(resource => (
				<ResourceCard key={resource.node.id} resource={resource} />
			))}
		</div>
	)
}

export default IcerResources
