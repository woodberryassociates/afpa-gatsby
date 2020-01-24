import '../global.css'

import PropTypes from 'prop-types'
import React from 'react'

import Footer from './footer'
import Header from './header/header'

const Layout = ({ children }) => {
	// smooth scrolling for anchor links
	if (typeof window !== `undefined`) require(`smooth-scroll`)(`a[href*="#"]`)

	return (
		<>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	)
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Layout
