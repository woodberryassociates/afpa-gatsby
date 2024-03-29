import { graphql } from 'gatsby'
import React from 'react'

import AsthmaResources from '../components/asthmaPage/asthmaResources'
import Layout from '../components/layout'
import SEO from '../components/seo'

const AsthmaPage = ({
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
			{header ? (
				<div className="content">
					<h5 className="text-center">{header}</h5>
				</div>
			) : null}

			{/* Video Player */}
			<div
				className="w-full m-auto relative"
				style={{ paddingBottom: `56.25%` }}
			>
				<iframe
					src="https://www.youtube.com/embed/CTmUEK2yHaE"
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
					title="Asthma"
				></iframe>
			</div>

			{/* Content */}
			<div
				className="mt-3 flex flex-col content"
				dangerouslySetInnerHTML={{ __html: content }}
			/>
		</div>

		{/* Featured Resources */}
		<AsthmaResources />
	</Layout>
)

export const pageQuery = graphql`
	query AsthmaPageQuery {
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

export default AsthmaPage
