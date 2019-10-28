import { graphql, Link, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

import { facebook_light, twitter_light, youtube_light } from '../images'

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      img: file(relativePath: { eq: "logo-light.png" }) {
        childImageSharp {
          fluid(maxWidth: 600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const [email, setEmail] = useState('')
  const handleEmail = event => setEmail(event.target.value)
  const handleSubmit = event => {
    event.preventDefault()
    alert('TODO')
  }

  return (
    <footer className="footerClip bg-lightBlue text-white text-sm font-light tracking-wider -mt-64">
      <div className="mx-2 md:mx-32 py-12 pt-24 min-h-250 flex flex-col xs:flex-row justify-between items-center xs:items-end">
        <div className="flex flex-col justify-end leading-loose">
          <a className="" href="https://gafpa.org/">
            GAFPA
          </a>
          <a className="" href="https://instituteforpatientaccess.org">
            IFPA
          </a>
          <a className="" href="#">
            CONTACT
          </a>
          <a className="" href="#">
            DONATE
          </a>
          <a className="" href="#">
            SEARCH
          </a>
        </div>

        <div className="flex flex-col justify-end">
          <Img className="my-3 -mx-3" fluid={data.img.childImageSharp.fluid} />
          <p>SUBSCRIBE TO OUR NEWSLETTER</p>
          <div className="bg-white h-px w-10 my-5" />
          <form className="flex flex-col text-darkGray" onSubmit={handleSubmit}>
            <input
              className="leading-loose p-2 rounded-lg mt-1 mb-4"
              type="text"
              value={email}
              onChange={handleEmail}
              placeholder="Your email"
            />
            <button className="border border-white rounded-lg" type="submit">
              Subscribe Now
            </button>
          </form>
        </div>
      </div>

      <div className="px-2 sm:px-32 bg-darkBlue h-16 text-xs flex justify-between items-center">
        <div className="pr-3">
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>.{` `}Theme by{` `}
          <a href="https://www.avinerenberg.com">Avi Nerenberg</a>.
        </div>

        <div className="flex justify-between items-center min-w-120 fill-current">
          <a>
            <img className="h-4" src={facebook_light} />
          </a>

          <a href="https://twitter.com/patientaccess">
            <img className="h-4" src={twitter_light} />
          </a>

          <a href="https://www.youtube.com/channel/UCnFUTFIj5E8jMNbmkZbiRMw">
            <img className="h-4" src={youtube_light} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
