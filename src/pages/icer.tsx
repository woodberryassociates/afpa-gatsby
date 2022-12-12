import { graphql } from 'gatsby'
import React from 'react'

import IcerResources from '../components/icerPage/icerResources'
import Layout from '../components/layout'
import SEO from '../components/seo'

const IcerPage = ({
	data: {
		page: { title, content, acf },
	},
}) => (
	<Layout>
		<SEO title={title} />
		<div className="mt-2 lg:mt-10 mb-10 mx-2 md:mx-32 xxl:mx-64 pb-10">
			{/* Title */}
			<h4 className="text-center" dangerouslySetInnerHTML={{ __html: title }} />

			{/* Header */}
			{acf?.header ? (
				<div className="content">
					<h5 className="text-center">{acf?.header}</h5>
				</div>
			) : null}

			{/* Video Player */}
			<div
				className="w-full m-auto relative"
				style={{ paddingBottom: `56.25%` }}
			>
				<iframe
					src="https://www.youtube.com/embed/7kIsB1BwH00"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					frameBorder="0" // TODO - deprecated (does it need replacing w/ an alternative?)
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
				className="mt-3 flex flex-col content"
				dangerouslySetInnerHTML={{ __html: content }}
			/>
		</div>

		{/* Featured Resources */}
		<IcerResources />
	</Layout>
)

export const pageQuery = graphql`
	query IcerPageQuery {
		page: wordpressPage(wordpress_id: { eq: 768 }) {
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
