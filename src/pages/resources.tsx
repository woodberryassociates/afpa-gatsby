import { graphql, Link } from 'gatsby'
import React from 'react'

import { PropTypes } from 'prop-types'
import Layout from '../components/layout'
import SEO from '../components/seo'

const ResourcePage = ({ data }) => (
  <Layout>
    <SEO title="Resource" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

ResourcePage.propTypes = {
  data: PropTypes.object.isRequired, // TODO: greater specificity
}

export const pageQuery = graphql`
  query ResourcePage {
    wordpressPage(title: { eq: "Home" }) {
      acf {
        working_groups
        coalitions
        resources
      }
    }
  }
`

export default ResourcePage
