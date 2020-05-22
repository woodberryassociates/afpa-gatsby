import React from 'react'

import { graphql } from 'gatsby'

import FeaturedTweet from '../components/indexPage/featuredTweet'
import MedicareChampions from '../components/indexPage/medicareChampions'
import Resources from '../components/indexPage/resources'
import Slider from '../components/indexPage/slider'
import WorkingGroups from '../components/indexPage/workingGroups'
import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = ({ data }) => (
	<Layout>
		<SEO title="Home" />
		<Slider />
		<div className="flex flex-wrap">
			<MedicareChampions />
			<FeaturedTweet />
		</div>

		{/* WORKING GROUPS */}
		<div className="flex flex-col items-center text-center homePageWGClip">
			<div className="m-4 md:m-24 px-2 sm:px-20 md:px-16 lg:px-32 pt-6 bg-white flex flex-col items-center">
				{/* <h4>AfPA in Action</h4> */}
				<h3 className="text-darkBlue">Working Groups</h3>
				<div
					className="max-w-700 mb-6 text-md leading-relaxed font-light"
					dangerouslySetInnerHTML={{
						__html: data.wordpressPage.acf.working_groups,
					}}
				/>
				<WorkingGroups />
			</div>
		</div>

		{/* RESOURCE LINKS */}
		<div className="pt-24 p-16 flex flex-col items-center text-center bg-backgroundGray">
			<div className="flex flex-col items-center text-center">
				<h4>Resource Center</h4>
				<div
					className="max-w-425 mb-6 leading-relaxed font-light"
					dangerouslySetInnerHTML={{
						__html: data.wordpressPage.acf.resources,
					}}
				/>
				<Resources />
			</div>
		</div>
	</Layout>
)

export const pageQuery = graphql`
	query HomePage {
		wordpressPage(title: { eq: "Home" }) {
			acf {
				working_groups
				coalitions
				resources
			}
		}
	}
`

export default IndexPage
