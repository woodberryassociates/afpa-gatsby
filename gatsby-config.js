module.exports = {
	siteMetadata: {
		title: `Alliance for Patient Access`,
		description: `Alliance for Patient Access is a national network of physicians dedicated to ensuring patient access to approved therapies and appropriate clinical care.`,
		author: `@avinerenberg`,
	},
	plugins: [
		{
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
				protocol: 'http',
				hostingWPCOM: false,
				useACF: true, // TODO(?)
				// searchAndReplaceContentUrls: {
				//   sourceUrl: "",
				//   replacementUrl: "",
				// },
				includedRoutes: [
					// Home Page CPTs
					'**/sliders',
					'**/working-groups',
					'**/coalitions',
					'**/home-resources',
					// About Page CPTs
					'**/annual-reports',
					'**/guiding-principles',
					'**/leadership',
					// Resources Page CPTs
					'**/videos',
					'**/infographics',
					// Events Page (+ Home Page) CPT
					'**/events',
					// Surveys Page CPT
					'**/surveys',
					// Advocacy Page CPTs
					'**/legislative-advocacy',
					'**/regulatory-advocacy',
					// Custom Backpage CPT
					'**/backpages',
					// WP Core
					'**/pages',
					'**/media',
					'**/tags',
					'**/categories',
				],
			},
		},
		{
			resolve: 'gatsby-source-gravityforms',
			options: {
				baseUrl: `http://${process.env.WP_ENV}` /** @TODO conditionally determine http/s */,
				api: {
					key:
						process.env.WP_ENV === 'localhost/afpa'
							? 'ck_1c36da8a57533b5e2e6bbcec9f5d26265c58bdd0'
							: 'ck_34f32e6a2a3685bf3af8a6df364893af5150bcba',
					secret:
						process.env.WP_ENV === 'localhost/afpa'
							? 'cs_f618c0b0f10cd9aaf5da21d3ba6c45e23af4b544'
							: 'cs_ca032e610110bde9cf232b9c58eb15f59886d889',
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
						link: node => node.acf.link,
						img: (node, getNode) => getNode(node.featured_media___NODE),
					},
					wordpress__wp_events: {
						title: node => node.title,
						link: node => node.acf.link,
						tags: (node, getNode) =>
							node.tags___NODE // ignore if empty (e.g. regular event) TODO?: add default tag
								? node.tags___NODE.map(id => getNode(id).name)
								: null,
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
						type: () => 'resource', // for filtering in the resourcesSearch component
						title: node => node.title,
						link: node => node.acf.link,
						img: (node, getNode) => getNode(node.featured_media___NODE),
					},
					wordpress__wp_videos: {
						type: () => 'resource',
						link: node => node.acf.url,
						title: node => node.title,
					},
				},
			},
		},
		// {
		//   resolve: `gatsby-plugin-stylus-resources`,
		//   options: {
		//     resources: ['./src/global.styl'],
		//     postCssPlugins: [require('tailwindcss')],
		//   },
		// },
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
		// `gatsby-plugin-purgecss`,
		`gatsby-plugin-react-helmet`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		`gatsby-plugin-typescript`,
		`gatsby-plugin-tslint`,
		`gatsby-plugin-offline`,
	],
}
