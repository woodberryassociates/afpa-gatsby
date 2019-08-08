import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import '../global.styl'
import { facebook, logo, search, twitter, youtube } from '../images'

const Header = () => (
  <header className="px-32 font-mons text-darkBlue bg-white flex flex-wrap">
    <div className="w-1/4">
      <h4
        style={{
          paddingBottom: '100%',
          background: '#EEE',
        }}
      >
        <Link to="/">
          <img src={logo} />
        </Link>
      </h4>
    </div>

    <section className="mx-6 w-1/2 flex flex-wrap justify-around items-center font-semibold">
      <div>
        <h4>
          <Link className="" to="/about">
            ABOUT
          </Link>
        </h4>
      </div>

      <div>
        <h4>
          <Link className="" to="/events">
            EVENTS
          </Link>
        </h4>
      </div>

      <div>
        <h4>
          <Link className="" to="/resources">
            RESOURCES
          </Link>
        </h4>
      </div>

      <div>
        <h4>
          <Link className="" to="/advocacy">
            ADVOCACY
          </Link>
        </h4>
      </div>

      <div>
        <h4>
          <Link className="" to="/surveyhub">
            SURVEYHUB
          </Link>
        </h4>
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

      <div>
        <a href="/">
          <img src={search} />
        </a>
      </div>
    </section>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
