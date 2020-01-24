import React from 'react'
import { Timeline } from 'react-twitter-widgets'

const FeaturedTweet = () => (
	<div className="w-full lg:w-3/6">
		<div className="lg:mx-40 my-4">
			<Timeline
				dataSource={{
					sourceType: `profile`,
					screenName: `patientaccess`,
				}}
				options={{
					tweetLimit: 1,
					borderColor: `#008FC3`,
				}}
			/>
		</div>
	</div>
)

export default FeaturedTweet
