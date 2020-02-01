import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import GravityFormForm from 'gatsby-gravityforms-component'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { useGravityData } from '../hooks/gravityForms'

const Backpage = ({ data: { post } }) => {
	const formData = useGravityData() // can't use hooks conditionally, so assigning here

	return (
		<Layout>
			<SEO title={post.title} />

			{post.featured_media ? (
				<Img
					className="max-h-500"
					imgStyle={{ objectPosition: `top` }}
					fluid={post.featured_media.localFile.childImageSharp.fluid}
				/>
			) : null}

			<div className="mt-2 lg:mt-10 mb-64 mx-2 md:mx-32 xl:mx-64 pb-10">
				<h4 dangerouslySetInnerHTML={{ __html: post.title }} />
				<div className="content flex flex-col">
					<div dangerouslySetInnerHTML={{ __html: post.content }} />
					{post.acf ? (
						<div className="xs:w-full sm:w-4/5 md:w-3/5 xl:w-2/5 self-center">
							<GravityFormForm
								id={post.acf.form_id}
								formData={formData}
								lambda={process.env.GATSBY_LAMBDA_ENDPOINT}
							/>
						</div>
					) : null}
				</div>
			</div>
		</Layout>
	)
}

export const postQuery = graphql`
	query($id: String!) {
		post: wordpressWpBackpages(id: { eq: $id }) {
			title
			content
			acf {
				form_id
			}
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
