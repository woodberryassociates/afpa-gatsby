import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import { PropTypes } from 'prop-types'
import React from 'react'

import AnnualReports from '../components/aboutPage/annualReports'
import GuidingPrinciples from '../components/aboutPage/guidingPrinciples'
import Leadership from '../components/aboutPage/leadership'
import Layout from '../components/layout'
import SEO from '../components/seo'

const AboutPage = ({ data }) => {
  const page = data.wordpressPage

  return (
    <Layout>
      <SEO title="About" />
      <Img fluid={page.featured_media.localFile.childImageSharp.fluid} />

      <div className="mx-64 flex flex-row">
        <div>
          <h5>Quick Links</h5>
          <ul>
            <li>
              <a href="#about">
                <h3>About AFPA</h3>
              </a>
            </li>
            <li>
              <a href="#annual-reports">
                <h3>Annual Reports</h3>
              </a>
            </li>
            <li>
              <a href="#guiding-principles">
                <h3>Guiding Principles</h3>
              </a>
            </li>
            <li>
              <a href="#chairman">
                <h3>Chairman</h3>
              </a>
            </li>
            <li>
              <a href="#leadership">
                <h3>Leadership</h3>
              </a>
            </li>
            <li>
              <a href="#membership">
                <h3>Membership</h3>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4>About AfPA</h4>
          <div dangerouslySetInnerHTML={{ __html: page.content }} />
          <p
            dangerouslySetInnerHTML={{
              __html: page.acf.fine_print,
            }}
          />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h4>Annual Reports</h4>
        <AnnualReports />
        <button>See More</button>
      </div>

      <div className="flex flex-col items-center bg-backgroundGray">
        <h4>Guiding Principles</h4>
        <p dangerouslySetInnerHTML={{ __html: page.acf.guiding_principles }} />
        <GuidingPrinciples />
      </div>

      <div className="flex flex-col items-center bg-darkBlue">
        <h4>Leadership</h4>
        <Leadership associateMembership={page.acf.associate_membership} />
      </div>
      <Img fluid={page.acf.membership_photo.localFile.childImageSharp.fluid} />
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired, // TODO: greater specificity
}

export const pageQuery = graphql`
  query AboutPage {
    wordpressPage(title: { eq: "About" }) {
      acf {
        fine_print
        annual_reports
        guiding_principles
        leadership
        associate_membership
        membership_photo {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1920) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
      content
      featured_media {
        localFile {
          childImageSharp {
            fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

export default AboutPage
