import { Index } from 'elasticlunr'
import { graphql, useStaticQuery } from 'gatsby'
import React, { Component, useEffect, useState } from 'react'

// https://www.gatsbyjs.org/packages/@tsimons/gatsby-plugin-elasticlunr-search/
const Search = () => {
	const data = useStaticQuery(graphql`
		query SearchIndexResearchQuery {
			siteSearchIndex {
				index
			}
		}
	`)
	const [query, setQuery] = useState()
	const [results, setResults] = useState()
	const [focus, setFocus] = useState(false)
	let index

	const getOrCreateIndex = () =>
		index ? index : Index.load(data.siteSearchIndex.index)

	const search = evt => {
		const tempQuery = evt.target.value
		index = getOrCreateIndex()
		setQuery(tempQuery)
		setResults(
			index
				.search(tempQuery)
				.filter(({ ref }) =>
					index.documentStore.getDoc(ref).type === `resource` ? true : false
				)
				.map(({ ref }) => index.documentStore.getDoc(ref))
		)
	}

	return (
		<div className="z-50 relative rounded border-2 border-lightGray bg-white text-lightBlue text-xl my-5 xl:my-0 mx-2 lg:mx-0">
			<input
				type="text"
				placeholder="Type to search resources..."
				value={query}
				onChange={search}
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
				className="w-full p-2 rounded border-b"
			/>
			<ul
				className={`absolute bg-white ${
					focus ? `visible opacity-100` : `invisible opacity-0`
				}`}
				style={{ transition: `all .25s ease-in` }}
			>
				{results
					? results.map(el => (
							<li key={el.id} className="">
								<a href={el.link} className="my-2 flex items-stretch">
									{/* TODO: query img for image-sharp */}
									{el.img ? (
										<img
											className="w-24 object-cover"
											src={el.img.source_url}
										/>
									) : null}
									<div className="ml-4 w-2/3 flex items-center">
										<p dangerouslySetInnerHTML={{ __html: el.title }} />
									</div>
								</a>
							</li>
					  ))
					: null}
			</ul>
		</div>
	)
}

export default Search
