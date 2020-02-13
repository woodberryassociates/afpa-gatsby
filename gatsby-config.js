module.exports = {
	siteMetadata: {
		title: `Alliance for Patient Access`,
		description: `Alliance for Patient Access is a national network of physicians dedicated to ensuring patient access to approved therapies and appropriate clinical care.`,
		author: `@avinerenberg`,
	},
	plugins: [{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `afpa-wordpress`,
				short_name: `afpa`,
				start_url: `/`,
				background_color: `#ffffff`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `src/images/favicon.png`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`,
			},
		},
		{
			resolve: `gatsby-source-wordpress`,
			options: {
				baseUrl: process.env.WP_ENV,
				protocol: `https`,
				hostingWPCOM: false,
				useACF: true,
				// searchAndReplaceContentUrls: {
				//   sourceUrl: "",
				//   replacementUrl: "",
				// },
				includedRoutes: [
					// Home Page CPTs
					`**/sliders`,
					`**/working-groups`,
					`**/coalitions`,
					`**/home-resources`,
					// About Page CPTs
					`**/annual-reports`,
					`**/guiding-principles`,
					`**/leadership`,
					// Resources Page CPTs
					`**/videos`,
					`**/infographics`,
					// Events Page (+ Home Page) CPT
					`**/events`,
					// Surveys Page CPT
					`**/surveys`,
					// Advocacy Page CPTs
					`**/legislative-advocacy`,
					`**/regulatory-advocacy`,
					// Custom Backpage CPT
					`**/backpages`,
					// WP Core
					`**/pages`,
					`**/media`,
					`**/tags`,
					`**/categories`,
				],
				normalizers: normalizers => [
					...normalizers,
					{
						// Normalizes the link format, so Gatsby doesn't drop
						// one type (link___NODE or external url string)
						name: `AcfLinkNormalizer`,
						normalizer: ({
							entities
						}) => {
							console.log(`Normalizing links...`)
							const media = entities.filter(
								e => e.__type === `wordpress__wp_media`
							)
							const links = entities.map(e => {
								if ( // custom post types
									e.__type === `wordpress__wp_surveys` ||
									e.__type === `wordpress__wp_infographics` ||
									e.__type === `wordpress__wp_annual_reports`
								) {
									if (e.acf.link___NODE)
										e.acf.textLink = media.find(
											m => m.id === e.acf.link___NODE
										).source_url
									else e.acf.textLink = e.acf.link
								} else if (e.__type === `wordpress__PAGE` && e.title === `About`) { // about page assoc membership link
									if (e.acf.associate_membership_link___NODE)
										e.acf.assocLink = media.find(
											m => m.id === e.acf.associate_membership_link___NODE
										).source_url
									else e.acf.assocLink = e.acf.associate_membership_link
								}
								return e
							})
							console.log(`Done!`)
							return links
						},
					},
				],
			},
		},
		{
			resolve: `gatsby-source-gravityforms`,
			options: {
				baseUrl: `https://${process.env.WP_ENV}`,
				api: {
					key: process.env.WP_ENV === `localhost/afpa` ?
						`ck_1c36da8a57533b5e2e6bbcec9f5d26265c58bdd0` : `ck_ba335c8113eff32c2185027fdd0cb32ddf58dc96`,
					secret: process.env.WP_ENV === `localhost/afpa` ?
						`cs_f618c0b0f10cd9aaf5da21d3ba6c45e23af4b544` : `cs_7d30d55a01952827476863bb283f9e0b3be14ca2`,
				},
			},
		},
		{
			/**
			 * getNode is OK (vs getNodeAndSavePathDependency) b/c the data is external and
			 * updated only on build, not dynamically
			 * https://www.gatsbyjs.org/packages/@tsimons/gatsby-plugin-elasticlunr-search/
			 * https://www.gatsbyjs.org/docs/node-api-helpers/#getNode
			 */
			resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
			options: {
				fields: [`title`, `img`, `link`, `tags`],
				resolvers: {
					// SITE-WIDE
					wordpress__wp_annual_reports: {
						title: node => node.title,
						// link: node => node.acf.link,
						img: (node, getNode) => getNode(node.featured_media___NODE),
					},
					wordpress__wp_events: {
						title: node => node.title,
						link: node => node.acf.link,
						tags: (node, getNode) =>
							node.tags___NODE // ignore if empty (e.g. regular event) TODO?: add default tag
							?
							node.tags___NODE.map(id => getNode(id).name) : null,
						img: (node, getNode) => getNode(node.featured_media___NODE),
					},
					wordpress__wp_surveys: {
						title: node => node.title,
						link: node => node.acf.textLink,
						tags: (node, getNode) =>
							node.tags___NODE // ignore if empty
							?
							node.tags___NODE.map(id => getNode(id).name) : null,
						img: (node, getNode) => getNode(node.featured_media___NODE),
					},
					wordpress__wp_legislative_advocacy: {
						title: node => node.title,
						// link: node => node.acf.link_bill,
					},
					wordpress__wp_regulatory_advocacy: {
						title: node => node.title,
						// link: node => node.acf.link_bill,
					},
					// RESOURCES
					wordpress__wp_infographics: {
						type: () => `resource`, // for filtering in the resourcesSearch component
						title: node => node.title,
						link: node => node.acf.textLink,
						img: (node, getNode) => getNode(node.featured_media___NODE),
					},
					wordpress__wp_videos: {
						type: () => `resource`,
						link: node => node.acf.url,
						title: node => node.title,
					},
				},
			},
		},
		{
			resolve: `gatsby-plugin-postcss`,
			options: {
				postCssPlugins: [
					require(`tailwindcss`),
					require(`precss`),
					require(`postcss-easing-gradients`),
					require(`postcss-preset-env`),
				],
			},
		},
		`gatsby-plugin-react-helmet`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		`gatsby-plugin-typescript`,
		`gatsby-plugin-offline`,
	],
}