import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'

const SurveyCard = ({
	key,
	event: {
		node: {
			title,
			acf: {
				link: { link },
				date,
				blurb,
			},
			featured_media,
		},
	},
}) => (
	<div
		key={key}
		className="my-10 flex flex-wrap justify-around curEventCard:justify-between bg-white cardShadow curEventCard"
	>
		{featured_media ? (
			<Img
				className="curEventCardImg"
				fixed={featured_media.localFile.childImageSharp.fixed}
			/>
		) : null}

		<div className="m-5 curEventCard:w-1/2">
			{/* Date */}
			<div className="mb-6 inline text-darkBlue text-sm font-medium tracking-wider uppercase">
				<span
					dangerouslySetInnerHTML={{
						__html: date.substring(11),
					}}
				/>
			</div>
			{/* Title */}
			<p
				dangerouslySetInnerHTML={{ __html: title }}
				className="my-2 text-xl text-lightBlue"
			/>
			{/* Blurb */}
			<p dangerouslySetInnerHTML={{ __html: blurb }} className="text-sm" />
		</div>

		{/* Survey Link*/}
		<a className="mr-10 mb-2 curEventCard:mb-0 self-center" href={link}>
			<button>View Survey</button>
		</a>
	</div>
)

const Surveys = () => {
	const data = useStaticQuery(graphql`
		query SurveysQuery {
			upcoming: allWordpressWpSurveys(
				sort: { fields: acf___date, order: ASC }
			) {
				edges {
					node {
						id
						title
						acf {
							link {
								link
							}
							date
							blurb
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
			<h5>Surveys</h5>
			{data.upcoming.edges.map(event => (
				<SurveyCard key={event.node.id} event={event} />
			))}
		</div>
	)
}

export default Surveys
