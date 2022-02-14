import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'

import IcerResources from '../components/icerPage/icerResources'
import Layout from '../components/layout'
import SEO from '../components/seo'

const IcerPage = ({
	data: {
		page: { title, content, featured_media },
	},
}) => (
	<Layout>
		<SEO title={title} />

		<div>
			{/* ICER Header */}
			{featured_media && (
				<Img
					imgStyle={{ objectPosition: `top` }}
					fluid={featured_media.localFile.childImageSharp.fluid}
				/>
			)}

			<div className="mt-2 lg:mt-10 mb-10 mx-2 md:mx-32 xl:mx-64 pb-10">
				<h4 dangerouslySetInnerHTML={{ __html: title }} />
				<div className="content flex flex-col">
					<div dangerouslySetInnerHTML={{ __html: content }} />
				</div>
			</div>

			<IcerResources />
		</div>
	</Layout>
)

export const pageQuery = graphql`
	query IcerPageQuery {
		page: wordpressPage(wordpress_id: { eq: 768 }) {
			id
			title
			content
		}
	}
`

export default IcerPage
