import React, { useEffect, useState } from 'react'
import Parser from 'rss-parser'

import CircleMediaPlayer from './circlePlayer'

// TODO: make this a graphql query & pagination
const parser = new Parser()
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/'
const podcastsResolver = async () => {
	try {
		const feed = await parser.parseURL(
			`${PROXY_URL}https://patientaccess.cast.rocks/feed.xml`
		)
		return feed
	} catch (e) {
		return e // TODO: not handled
	}
}

const Podcasts = () => {
	const [podcasts, setPodcasts] = useState()
	useEffect(() => {
		podcastsResolver().then(r => {
			setPodcasts((r as any).items)
		})
	}, [])

	return (
		<div className="mb-16 mx-2 sm:mx-0 flex flex-col">
			{podcasts
				? podcasts.map((podcast, i) =>
						// only print the first 5
						// TODO: pagination, for now just a link to the podcast on itunes
						i < 5 ? (
							<div className="my-5 flex items-start" key={podcast.guid}>
								<CircleMediaPlayer src={podcast.enclosure.url} />
								<div className="max-w-2xl overflow-hidden">
									<h5 className="">{podcast.title}</h5>
									<p>{podcast.content}</p>
									<p className="my-1 text-sm text-darkGray">
										{podcast.pubDate.slice(0, 17)}
									</p>
								</div>
							</div>
						) : null
				  )
				: null}
			<a
				className="self-center sm:self-end mr-2"
				href="https://podcasts.apple.com/us/podcast/afpas-patient-access-podcast/id1432624094"
			>
				<h5 className="text-xl">See More & Subscribe Here</h5>
			</a>
		</div>
	)
}

export default Podcasts
