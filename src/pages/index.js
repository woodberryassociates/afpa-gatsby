import React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>

    {data.allWordpressPost.edges.map(({ key, node }) => (
      <div key={key}>
        <h3>{node.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
      </div>
    ))}

    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

IndexPage.propTypes = {
  data: PropTypes.object,
}

export const pageQuery = graphql`
  query {
    allWordpressPost(sort: { fields: [date] }) {
      edges {
        node {
          title
          excerpt
          slug
        }
      }
    }
  }
`

export default IndexPage
