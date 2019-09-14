import { graphql, Link } from 'gatsby'
import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const AdvocacyPage = () => (
  <Layout>
    <SEO title="Advocacy" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export const pageQuery = graphql`
  query LegislativeAdvocacy {
    allWordpressWpLegislativeAdvocacy {
      edges {
        node {
          title
          tags {
            name
            slug
          }
          categories {
            name
            slug
          }
          acf {
            link_legislator
            link_bill
          }
        }
      }
    }
  }
`

export default AdvocacyPage
