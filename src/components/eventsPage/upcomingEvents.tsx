import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'

const UpcomingEventCard = ({
	key,
	event: {
		node: {
			title,
			acf: { link, start_date, end_date, blurb },
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
						__html: start_date.substring(11),
					}}
				/>
				{end_date ? (
					<>
						{` - `}
						<span
							dangerouslySetInnerHTML={{
								__html: end_date,
							}}
						/>
					</>
				) : null}
			</div>
			{/* Title */}
			<p
				dangerouslySetInnerHTML={{ __html: title }}
				className="my-2 text-xl text-lightBlue"
			/>
			{/* Blurb */}
			<p dangerouslySetInnerHTML={{ __html: blurb }} className="text-sm" />
		</div>

		{/* Registration button */}
		<a className="mr-10 mb-2 curEventCard:mb-0 self-center" href={link}>
			<button>Register Today</button>
		</a>
	</div>
)

const UpcomingEvents = () => {
	const data = useStaticQuery(graphql`
		query UpcomingEventsQuery {
			upcoming: allWordpressWpEvents(
				filter: { tags: { elemMatch: { slug: { ne: "past-event" } } } }
				sort: { fields: acf___start_date, order: ASC }
			) {
				edges {
					node {
						id
						title
						acf {
							link
							start_date
							end_date
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
		<div className="px-2 md:px-32 lg:px-64 pt-10 pb-32 bg-backgroundLightGray leftBottomTilt">
			<h5>Upcoming Events</h5>
			{data.upcoming.edges.map(event => (
				<UpcomingEventCard key={event.node.id} event={event} />
			))}
		</div>
	)
}

export default UpcomingEvents
