import { graphql, Link } from 'gatsby'
import React from 'react'

import { PropTypes } from 'prop-types'
import Layout from '../components/layout'
import Videos from '../components/resourcesPage/videos'
import SEO from '../components/seo'

const ResourcePage = ({ data }) => {
  const page = data.wordpressPage

  return (
    <Layout>
      <SEO title="Resource" />
      <Videos />
    </Layout>
  )
}

ResourcePage.propTypes = {
  data: PropTypes.object.isRequired, // TODO: greater specificity
}

export const pageQuery = graphql`
  query ResourcesPage {
    wordpressPage(title: { eq: "Resources" }) {
      acf {
        videos
        podcasts
        infographics
        ifpa
        ifpa_link
      }
      content
    }
  }
`

export default ResourcePage
