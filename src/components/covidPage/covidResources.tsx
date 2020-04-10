import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'

const ResourceCard: JSX.IntrinsicAttributes & React.FC<any> = ({
	resource: {
		node: {
			title,
			acf: { textLink, link_text, date, author },
			featured_media,
		},
	},
}) => (
	<div className="my-10 flex flex-wrap sm:flex-no-wrap justify-around curEventCard:justify-between bg-white cardShadow curEventCard">
		{featured_media ? (
			<Img
				className="curEventCardImg self-center"
				imgStyle={{
					objectFit: `contain`,
				}}
				fixed={featured_media.localFile.childImageSharp.fixed}
			/>
		) : null}

		<div className="m-5 curEventCard:w-1/2">
			{/* Title */}
			<p
				dangerouslySetInnerHTML={{ __html: title }}
				className="my-2 text-xl text-lightBlue"
			/>
			{/* Blurb */}
			<p dangerouslySetInnerHTML={{ __html: author }} className="text-sm" />
		</div>

		{/* Survey Link */}
		<a className="mr-10 mb-2 curEventCard:mb-0 self-center" href={textLink}>
			<button>{link_text}</button>
		</a>
	</div>
)

const CovidResources = () => {
	const data = useStaticQuery(graphql`
		query CovidQuery {
			upcoming: allWordpressWpCovid19S {
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
			{data.upcoming.edges.map(resource => (
				<ResourceCard key={resource.node.id} resource={resource} />
			))}
		</div>
	)
}

export default CovidResources
