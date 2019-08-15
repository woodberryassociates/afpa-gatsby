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
    <div className="clipped absolute" />
    <div className="flex flex-col items-center text-center ">
      <div className="m-24 px-64 pb-0 pt-6 bg-white">
        <h4>AfPA in Action</h4>
        <h3 className="text-darkBlue">Working Groups</h3>
        <div
          className="mb-3"
          dangerouslySetInnerHTML={{
            __html: data.wordpressPage.acf.working_groups,
          }}
        />
        <WorkingGroups />
      </div>
    </div>
    <div className="my-16 flex flex-col items-center text-center">
      <div className="mx-16 px-40 flex flex-col items-center text-center max-w-1200">
        <h3 className="text-darkBlue">Coalitions</h3>
        <div
          className="my-3"
          dangerouslySetInnerHTML={{
            __html: data.wordpressPage.acf.coalitions,
          }}
        />
        <Coalitions />
      </div>
    </div>
    <div className="p-16 flex flex-col items-center text-center bg-backgroundGray">
      <div className="flex flex-col items-center text-center">
        <h4>Online Resource Center</h4>
        <div
          className="max-w-425 mb-6 text-md leading-relaxed font-light"
          dangerouslySetInnerHTML={{
            __html: data.wordpressPage.acf.resources,
          }}
        />
        <Resources />
      </div>
    </div>
  </Layout>
)

IndexPage.propTypes = {
  data: PropTypes.object.isRequired, // TODO: greater specificity
}

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
