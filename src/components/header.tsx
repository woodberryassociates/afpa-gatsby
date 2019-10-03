import { graphql, Link, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React, { useState } from 'react'

import { facebook, search, twitter, youtube } from '../images' // TODO: use fontawesome here
import Search from './headerSearch'

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      img: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  const [showSearch, setShowSearch] = useState(false)

  return (
    <header className="xl:px-32 text-darkBlue bg-white flex flex-wrap justify-around">
      <div className="w-1/4">
        <h6>
          <Link to="/">
            <Img fluid={data.img.childImageSharp.fluid} />
          </Link>
        </h6>
      </div>

      <section className="w-1/2 flex flex-wrap justify-around items-center font-semibold">
        <div>
          <h6>
            <Link className="" to="/about">
              ABOUT
            </Link>
          </h6>
        </div>

        <div>
          <h6>
            <Link className="" to="/events">
              EVENTS
            </Link>
          </h6>
        </div>

        <div>
          <h6>
            <Link className="" to="/resources">
              RESOURCES
            </Link>
          </h6>
        </div>

        <div>
          <h6>
            <Link className="" to="/advocacy">
              ADVOCACY
            </Link>
          </h6>
        </div>

        <div>
          <h6>
            <Link className="" to="/surveyhub">
              SURVEYHUB
            </Link>
          </h6>
        </div>
      </section>

      <section className="w-1/6 flex justify-around items-center">
        <div>
          <a href="https://facebook.com/patientaccess">
            <img src={facebook} />
          </a>
        </div>

        <div>
          <a href="https://twitter.com/patientaccess">
            <img src={twitter} />
          </a>
        </div>

        <div>
          <a href="https://www.youtube.com/channel/UCnFUTFIj5E8jMNbmkZbiRMw">
            <img src={youtube} />
          </a>
        </div>

        <div className="relative cursor-pointer">
          <img src={search} onClick={() => setShowSearch(!showSearch)} />
          <Search show={showSearch} setShow={setShowSearch} />
        </div>
      </section>
    </header>
  )
}

export default Header
