import '../global.css'

import React from 'react'

import Footer from './footer'
import Header from './header/header'

const Layout: React.FC = ({ children }) => {
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

export default Layout
