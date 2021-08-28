import { graphql } from 'gatsby'
import React from 'react'

import IcerResources from '../components/icerPage/icerResources'
import Layout from '../components/layout'
import SEO from '../components/seo'

const IcerPage = ({
	data: {
		page: {
			title,
			content,
			acf: { header },
		},
	},
}) => (
	<Layout>
		<SEO title={title} />
		<div className="mt-2 lg:mt-10 mb-10 mx-2 md:mx-32 xxl:mx-64 pb-10">
			{/* Title */}
			<h4 className="text-center" dangerouslySetInnerHTML={{ __html: title }} />

			{/* Header */}
			<div className="content">
				<h5 className="text-center">{header}</h5>
			</div>

			{/* Video Player */}
			<div
				className="w-full m-auto relative"
				style={{ paddingBottom: `56.25%` }}
			>
				<iframe
					src="https://www.youtube.com/embed/U6Sizkp9i94?start=298"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					frameBorder="0"
					width="100%"
					height="100%"
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

			{/* Content */}
			<div
				className="mt-3 content flex flex-col"
				dangerouslySetInnerHTML={{ __html: content }}
			/>
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
			acf {
				header
			}
		}
	}
`

export default IcerPage
