import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import { Timeline } from 'react-twitter-widgets'

const FeaturedTweet = () => (
  <div className="w-full lg:w-3/6">
    <div className="mx-40 my-4">
      {/* <TwitterTimelineEmbed
        sourceType="profile"
        screenName="patientaccess"
        options={{ tweetLimit: 1 }}
			/> */}
      <Timeline
        dataSource={{
          sourceType: 'profile',
          screenName: 'patientaccess',
        }}
        options={{
          tweetLimit: 1,
          borderColor: '#008FC3',
        }}
      />
    </div>
  </div>
)

export default FeaturedTweet
