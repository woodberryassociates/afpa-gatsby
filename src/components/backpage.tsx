import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const Backpage = ({ data: { wordpressWpBackpages: post } }) => (
	<Layout>
		<SEO title={post.title} />
		{post.featured_media ? (
			<Img
				className="max-h-500"
				fluid={post.featured_media.localFile.childImageSharp.fluid}
			/>
		) : null}
		<div className="mt-2 lg:mt-10 mb-64 mx-2 md:mx-32 xl:mx-64">
			<h4 dangerouslySetInnerHTML={{ __html: post.title }} />
			<div
				className="content"
				dangerouslySetInnerHTML={{ __html: post.content }}
			/>
		</div>
	</Layout>
)

export const postQuery = graphql`
	query($id: String!) {
		wordpressWpBackpages(id: { eq: $id }) {
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

export default Backpage
