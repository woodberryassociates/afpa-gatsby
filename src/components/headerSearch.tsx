import { Index } from 'elasticlunr'
import { graphql, useStaticQuery } from 'gatsby'
import React, { useEffect, useState } from 'react'

// https://www.gatsbyjs.org/packages/@tsimons/gatsby-plugin-elasticlunr-search/
const Search = ({ show, setShow }) => {
	const data = useStaticQuery(graphql`
		query SearchIndexQuery {
			siteSearchIndex {
				index
			}
		}
	`)
	const [query, setQuery] = useState()
	const [results, setResults] = useState()
	let index
	let inputRef

	const getOrCreateIndex = () =>
		index ? index : Index.load(data.siteSearchIndex.index)

	const search = evt => {
		const tempQuery = evt.target.value
		index = getOrCreateIndex()
		setQuery(tempQuery)
		setResults(
			index.search(tempQuery).map(({ ref }) => index.documentStore.getDoc(ref))
		)
	}

	// focus on show
	useEffect(() => inputRef.focus(), [inputRef, show])

	return (
		<div
			className={`z-50 absolute rounded border-2 border-lightGray bg-white text-darkBlue text-xl searchBar  ${
				show ? `visible opacity-100` : `invisible opacity-0`
				}`}
			style={{ transform: `translate(-100%)`, transition: `all .25s ease-in` }}
		>
			<input
				type="text"
				placeholder="Type to search..."
				value={query}
				onChange={search}
				ref={input => (inputRef = input)} // focus on show
				// onBlur={() => setShow(false)} // hide on blur, TODO: avoid clashing with onClick() in Header
				className={`lg:w-500 p-2 rounded border-b`}
			/>
			<ul>
				{results
					? results.map(el => (
						<li key={el.id}>
							<a
								href={el.link}
								className="my-2 flex items-stretch"
							>
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
