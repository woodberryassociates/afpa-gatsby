import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const NotFoundPage = () => (
	<Layout>
		<SEO title="404: Not found" />
		<div className="mt-2 lg:mt-10 mb-64 mx-2 md:mx-32 xl:mx-64 pb-10 content">
			<h1>NOT FOUND</h1>
			<p>You just hit a route that doesn&#39;t exist :(</p>
		</div>
	</Layout>
)

export default NotFoundPage
