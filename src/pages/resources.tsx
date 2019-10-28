import { graphql, Link } from 'gatsby'
import React, { useState } from 'react'
import ReactPlayer from 'react-player'

import Layout from '../components/layout'
import Infographics from '../components/resourcesPage/infographics'
import Podcasts from '../components/resourcesPage/podcasts'
import Search from '../components/resourcesPage/resourcesSearch'
import Videos from '../components/resourcesPage/videos'
import SEO from '../components/seo'

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

const ResourcePage = ({
  data: { wordpressPage: page, wordpressWpVideos: video },
}) => {
  const [isFeaturedPlaying, setIsFeaturedPlaying] = useState(false)

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

          <Search />
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
        <h4 id="videos">Video Center</h4>
        <div
          className="max-w-700 mb-6 text-md leading-relaxed font-light"
          dangerouslySetInnerHTML={{
            __html: page.acf.videos,
          }}
        />
        <Videos />
      </div>

      <div className="flex flex-col items-center">
        <h4 id="podcasts">Patient Access Podcast</h4>
        <p
          className="max-w-700 sectionSubHead"
          dangerouslySetInnerHTML={{
            __html: page.acf.podcasts,
          }}
        />
        <Podcasts />
      </div>

      {/* Infographics */}
      <div className="-mb-32 pt-16 pb-32 flex flex-col items-center bg-backgroundLightGray">
        <h4 id="infographics">Infographics</h4>
        <p
          className="mb-12 max-w-700 sectionSubHead"
          dangerouslySetInnerHTML={{
            __html: page.acf.infographics,
          }}
        />
        <Infographics />
      </div>

      <div className="mb-12 pb-64 pt-32 flex flex-col items-center bg-white leftTopTilt">
        <h4>Can't find it?</h4>
        <div
          className="max-w-425 mb-6 text-md leading-relaxed font-light text-center"
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
    wordpressWpVideos(tags: { elemMatch: { slug: { eq: "featured-video" } } }) {
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
