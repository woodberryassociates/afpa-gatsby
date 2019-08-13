import { graphql, Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import Image from '../components/image'
import Slider from '../components/index/slider'
import Layout from '../components/layout'
import SEO from '../components/seo'

// import '../global.styl'
import FeaturedEvent from './../components/index/featuredEvent'
import FeaturedTweet from './../components/index/featuredTweet'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <Slider />
    <div className="flex flex-wrap">
      <FeaturedEvent />
      <FeaturedTweet />
    </div>
  </Layout>
)

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query IndexPage {
    allWordpressWpSliders {
      edges {
        node {
          content
          title
          featured_media {
            link
          }
        }
      }
    }
  }
`

export default IndexPage
