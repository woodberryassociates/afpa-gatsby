import { graphql } from 'gatsby'
import React from 'react'

import IcerResources from '../components/icerPage/icerResources'
import IcerSpeakers from '../components/icerPage/icerSpeakers'
import Layout from '../components/layout'
import SEO from '../components/seo'

const IcerPage = ({
	data: {
		page: { title, content, featured_media },
	},
}) => (
	<Layout>
		<SEO title={title} />
		<div className="mt-2 lg:mt-10 mb-10 mx-2 md:mx-32 xxl:mx-64 pb-10">
			{/* Header */}
			<h4 dangerouslySetInnerHTML={{ __html: title }} />

			{/* Content */}
			<div className="content flex flex-col">
				<div dangerouslySetInnerHTML={{ __html: content }} />
			</div>

			<div className="grid grid-cols-1 col-gap-6 md:grid-cols-2 xxl:grid-cols-6">
				{/* Q & A (powered by slido) */}
				<div className="xxl:col-start-2 xxl:col-span-2">
					<h5>Q & A</h5>
					<iframe
						src="https://app.sli.do/event/0ssbsxyo"
						width="100%"
						frameBorder="0"
						style={{ minHeight: `560px` }}
						title="Slido"
					></iframe>
				</div>

				{/* Featured Speakers */}
				<IcerSpeakers className="xxl:col-span-2" />
			</div>
		</div>

		{/* Featured Resources */}
		<IcerResources />
	</Layout>
)

export const pageQuery = graphql`
	query IcerPageQuery {
		page: wordpressPage(wordpress_id: { eq: 1462 }) {
			id
			title
			content
		}
	}
`

export default IcerPage
