import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'

import CovidResources from '../components/covidPage/covidResources'
import Layout from '../components/layout'
import SEO from '../components/seo'

const CovidPage = ({
	data: {
		page: { title, content, featured_media },
	},
}) => (
	<Layout>
		<SEO title={title} />
		<div>
			{/* COVID Header */}
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

			<CovidResources />
		</div>
	</Layout>
)

export const pageQuery = graphql`
	query CovidPageQuery {
		page: wordpressPage(wordpress_id: { eq: 768 }) {
			id
			title
			content
		}
	}
`

export default CovidPage
