import { graphql, Link } from 'gatsby'
import React, { useState } from 'react'

import ReactPlayer from 'react-player'
import Layout from '../components/layout'
import Podcasts from '../components/resourcesPage/podcasts'
import Videos from '../components/resourcesPage/videos'
import SEO from '../components/seo'
import Infographics from './../components/resourcesPage/infographics'

const FeaturedVideoGradient = ({ video, playing }) => {
  return !playing ? (
    <div className="w-full h-full flex bottom-0 absolute linearGradient">
      <div className="p-5 self-end">
        <h5
          className="text-textGreen"
          dangerouslySetInnerHTML={{ __html: video.title }}
        />
        <h6
          className="text-white"
          dangerouslySetInnerHTML={{
            __html: video.acf.coalition + `, ` + video.date,
          }}
        />
      </div>
    </div>
  ) : null
}

const ResourcePage = ({ data }) => {
  const page = data.wordpressPage
  const video = data.wordpressWpVideos
  const [isFeaturedPlaying, setIsFeaturedPlaying] = useState(false)

  // resource query functions
  const [query, setQuery] = useState('')
  const handleQuery = event => setQuery(event.target.value)
  const handleSubmit = event => {
    event.preventDefault()
    alert('TODO')
  }

  return (
    <Layout>
      <SEO title="Resources" />

      {/* Header & Featured Video */}
      <div className="pb-32 pt-16 flex flex-wrap justify-around resourcePageHeaderClip">
        <div className="flex flex-col justify-between lg:w-2/5">
          <div>
            <h4
              className="text-white"
              dangerouslySetInnerHTML={{ __html: page.title }}
            />
            <div
              className="text-white font-light text-lg"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
          {/* TODO: Resource search form */}
          <form className="text-darkGray" onSubmit={handleSubmit}>
            <input
              className="p-2 pr-16 border-2 placeholder-darkGray border-lightGray rounded-lg leading-loose"
              type="text"
              value={query}
              onChange={handleQuery}
              placeholder="Search resources"
            />
          </form>
        </div>
        <div className="relative">
          <ReactPlayer
            className="lg:mt-16"
            url={video.acf.url}
            light={true}
            playing={true}
            height={340}
            onPlay={() => setIsFeaturedPlaying(true)}
            onPause={() => setIsFeaturedPlaying(false)}
          />
          <FeaturedVideoGradient video={video} playing={isFeaturedPlaying} />
        </div>
      </div>

      {/* Video Center */}
      <div className="pb-32 flex flex-col items-center bg-backgroundGray leftBottomTilt">
        <h4>Video Center</h4>
        <div
          className="max-w-700 mb-6 text-md leading-relaxed font-light"
          dangerouslySetInnerHTML={{
            __html: page.acf.videos,
          }}
        />
        <Videos />
      </div>

      <div className="flex flex-col items-center">
        <h4>Patient Access Podcast</h4>
        <p
          className="max-w-700 sectionSubHead"
          dangerouslySetInnerHTML={{
            __html: page.acf.podcasts,
          }}
        />
        <Podcasts />
      </div>

      <div className="flex flex-col items-center bg-backgroundLightGray">
        <h4>Infographics</h4>
        <div
          className="max-w-700 sectionSubHead"
          dangerouslySetInnerHTML={{
            __html: page.acf.infographics,
          }}
        />
        <Infographics />
      </div>

      <div className="flex flex-col items-center">
        <h4>Can't find it?</h4>
        <div
          className="max-w-700 mb-6 text-md leading-relaxed font-light"
          dangerouslySetInnerHTML={{
            __html: page.acf.ifpa,
          }}
        />
        <a href="https://instituteforpatientaccess.org">
          <button>{page.acf.ifpa_link}</button>
        </a>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query ResourcesPage {
    wordpressPage(title: { eq: "Resources" }) {
      title
      content
      acf {
        videos
        podcasts
        infographics
        ifpa
        ifpa_link
      }
    }
    wordpressWpVideos(tags: { elemMatch: { slug: { eq: "featured" } } }) {
      title
      acf {
        coalition
        url
      }
      date(formatString: "MMMM YYYY")
    }
  }
`

export default ResourcePage
