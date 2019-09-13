import { graphql, Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import Slider from '../components/indexPage/slider'
import Layout from '../components/layout'
import SEO from '../components/seo'

import FeaturedEvent from '../components/indexPage/featuredEvent'
import FeaturedTweet from '../components/indexPage/featuredTweet'
import Coalitions from './../components/indexPage/coalitions'
import Resources from './../components/indexPage/resources'
import WorkingGroups from './../components/indexPage/workingGroups'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <Slider />
    <div className="flex flex-wrap">
      <FeaturedEvent />
      <FeaturedTweet />
    </div>
    <div className="flex flex-col items-center text-center homePageWGClip">
      <div className="m-24 mb-0 px-64 pt-6 bg-white flex flex-col items-center">
        <h4>AfPA in Action</h4>
        <h3 className="text-darkBlue">Working Groups</h3>
        <div
          className="max-w-700 mb-6 text-md leading-relaxed font-light"
          dangerouslySetInnerHTML={{
            __html: data.wordpressPage.acf.working_groups,
          }}
        />
        <WorkingGroups />
      </div>

      <div className="mx-24 px-64 pt-24 pb-16 flex flex-col items-center bg-white">
        <div className="flex flex-col items-center">
          <h3 className="text-darkBlue">Coalitions</h3>
          <div
            className="max-w-700 mb-6 text-md leading-relaxed font-light"
            dangerouslySetInnerHTML={{
              __html: data.wordpressPage.acf.coalitions,
            }}
          />
          <Coalitions />
        </div>
      </div>
    </div>
    <div className="p-16 flex flex-col items-center text-center bg-backgroundGray">
      <div className="flex flex-col items-center text-center">
        <h4>Online Resource Center</h4>
        <div
          className="max-w-425 mb-6 leading-relaxed font-light"
          dangerouslySetInnerHTML={{
            __html: data.wordpressPage.acf.resources,
          }}
        />
        <Resources />
      </div>
    </div>
  </Layout>
)

export const pageQuery = graphql`
  query HomePage {
    wordpressPage(title: { eq: "Home" }) {
      acf {
        working_groups
        coalitions
        resources
      }
    }
  }
`

export default IndexPage
