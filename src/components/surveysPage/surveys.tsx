import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

const SurveyCard = ({
	key,
	event: {
		node: {
			title,
			acf: { textLink, date, blurb },
		},
	},
}) => (
	<div
		key={key}
		className="my-10 flex flex-wrap sm:flex-no-wrap justify-around curEventCard:justify-between bg-white cardShadow curEventCard"
	>
		<div className="m-5 curEventCard:w-1/2">
			{/* Title */}
			<p
				dangerouslySetInnerHTML={{ __html: title }}
				className="my-2 text-xl text-lightBlue"
			/>
			{/* Blurb */}
			<p dangerouslySetInnerHTML={{ __html: blurb }} className="text-sm" />
		</div>

		{/* Survey Link */}
		<a className="mr-10 mb-2 curEventCard:mb-0 self-center" href={textLink}>
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
							textLink
							date
							blurb
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
