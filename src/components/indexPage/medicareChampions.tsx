import React from 'react'

import { Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'

import { award } from '../../images'

const MedicareChampions = () => (
	<BackgroundImage
		className="indexPageFeaturedEventBackgroundImage" // TODO: tailwind classes aren't working
		fluid={[
			`url(${award})`,
			`linear-gradient(rgba(36, 43, 96, 0.79), rgba(36, 43, 96, 0.79))`,
		].reverse()}
	>
		<div className="h-full w-full px-2 flex flex-col justify-center items-center">
			<div className="max-w-md mr-0 lg:mr-24 flex flex-col justify-between items-start">
				<h2 className="text-white text-2xl leading-relaxed my-2">
					AfPA Recognizes Champions of Patient Access
				</h2>
				<Link to="2020-champions-of-patient-access">
					<button>Learn more</button>
				</Link>
			</div>
		</div>
	</BackgroundImage>
)

export default MedicareChampions
