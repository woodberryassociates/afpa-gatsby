import { graphql, Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import Image from '../components/image'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Slider from '../components/slider'

// import '../global.styl'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <Slider />
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
