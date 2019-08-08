import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import '../global.styl'
// import './header.styl'

const Header = ({ siteTitle }) => (
  <header className="bg-white">
    <div>
      <h4>
        <Link className="" to="/">
          {siteTitle}
        </Link>
      </h4>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
