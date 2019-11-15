import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const DefaultPage = (/* { data: { page, featured, current, past } } */) => (
	<Layout>
		<SEO title="Default" /> {/* TODO */}
		<div className="mb-64 lg:px-64 md:px-32 sm:px-16 px-2">State Chapters</div>
	</Layout>
)

export default DefaultPage
