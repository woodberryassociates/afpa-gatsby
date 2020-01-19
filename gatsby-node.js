/**
 * Generate custom backpages from the "backpage" CPT
 */
const path = require(`path`)
const slash = require(`slash`)
exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions
	const result = await graphql(`
		query MyQuery {
			allWordpressWpBackpages {
				edges {
					node {
						id
						slug
					}
				}
			}
		}
	`)
	const postTemplate = path.resolve(`./src/components/backpage.tsx`)

	result.data.allWordpressWpBackpages.edges.forEach(edge => {
		createPage({
			path: edge.node.slug, // page url
			component: slash(postTemplate), // template
			context: {
				id: edge.node.id, // id used for page query
			},
		})
	})
}

/**
 * Explicit types
 * @TODO get ACF links to behave predictably
 */
// exports.createSchemaCustomization = ({ actions }) => {
// 	const { createTypes } = actions
// 	const typeDefs = `
// 		type acf implements Node {
// 			link: String
// 		}

//     type wordpressWpInfographics implements Node {
// 			 acf: acf
//     }
//   `
// 	createTypes(typeDefs)
// }
