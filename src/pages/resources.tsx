import { graphql, Link } from 'gatsby'
import React from 'react'

import ReactPlayer from 'react-player'
import Layout from '../components/layout'
import Videos from '../components/resourcesPage/videos'
import SEO from '../components/seo'

const ResourcePage = ({ data }) => {
  const page = data.wordpressPage
  const video = data.wordpressWpVideos

  return (
    <Layout>
      <SEO title="Resources" />
      <div className="pb-24 pt-16 flex flex-wrap justify-around resourcePageHeaderClip">
        <div className="lg:w-2/5">
          <h4
            className="text-white"
            dangerouslySetInnerHTML={{ __html: page.title }}
          />
          <div
            className="text-white font-light text-lg"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
        <div>
          <ReactPlayer
            className="lg:mt-16"
            url={video.acf.url}
            light={true}
            playing={true}
            height={340}
          />
          <div className="relative bottom-15 linearGradient">
            <div className="pt- relative bottom-1/4 left-1/6">
              <h5
                className="text-textGreen"
                dangerouslySetInnerHTML={{ __html: video.title }}
              />
              <h6
                className=""
                dangerouslySetInnerHTML={{
                  __html: video.acf.coalition + `, ` + video.date,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center bg-backgroundGray">
        <h4>Video Center</h4>
        <div
          className="max-w-650 mb-6 text-md leading-relaxed font-light"
          dangerouslySetInnerHTML={{
            __html: page.acf.videos,
          }}
        />
        <Videos />
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
