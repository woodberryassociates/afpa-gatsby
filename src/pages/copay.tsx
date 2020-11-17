import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'

import CopayResources from '../components/copayPage/copayResources'
import Layout from '../components/layout'
import SEO from '../components/seo'

const CopayPage = ({
	data: {
		page: { title, content, featured_media },
	},
}) => (
	<Layout>
		<SEO title={title} />
		<div>
			{/* Co-pay Header */}
			{featured_media ? (
				<Img
					imgStyle={{ objectPosition: `top` }}
					fluid={featured_media.localFile.childImageSharp.fluid}
				/>
			) : null}

			<div className="mt-2 lg:mt-10 mb-10 mx-2 md:mx-32 xl:mx-64 pb-10">
				<h4 dangerouslySetInnerHTML={{ __html: title }} />
				<div className="content flex flex-col">
					<div dangerouslySetInnerHTML={{ __html: content }} />
				</div>
			</div>

			<CopayResources />
		</div>
	</Layout>
)

export const pageQuery = graphql`
	query CopayPageQuery {
		page: wordpressPage(wordpress_id: { eq: 1116 }) {
			id
			title
			content
			featured_media {
				localFile {
					childImageSharp {
						fluid(maxWidth: 1920) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		}
	}
`

export default CopayPage
