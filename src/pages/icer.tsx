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
			{/* Title */}
			<h4 className="text-center" dangerouslySetInnerHTML={{ __html: title }} />

			{/* Content */}
			<div className="content flex flex-col">
				<div dangerouslySetInnerHTML={{ __html: content }} />

				{/* Video Player */}
				<div className="w-full lg:w-3/4 m-auto relative py-32 lg:py-72">
					<iframe
						src="https://vimeo.com/event/1221255/embed/28b1a60f6d"
						frameBorder="0"
						allow="autoplay; fullscreen; picture-in-picture"
						allowFullScreen={true}
						style={{
							position: `absolute`,
							top: 0,
							left: 0,
							width: `100%`,
							height: `100%`,
						}}
						title="ICER"
					></iframe>
				</div>
			</div>

			<div className="mt-8 grid grid-cols-1 col-gap-6 md:grid-cols-2 xxl:grid-cols-6">
				{/* Q & A (powered by slido) */}
				<div className="xxl:col-start-2 xxl:col-span-2">
					<h5>Q & A</h5>
					<iframe
						src="https://app.sli.do/event/rfjrqrv4"
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
