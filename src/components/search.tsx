import { Index } from 'elasticlunr'
import { graphql, useStaticQuery } from 'gatsby'
import React, { Component, useState } from 'react'

// https://www.gatsbyjs.org/packages/@tsimons/gatsby-plugin-elasticlunr-search/
const Search = () => {
  const data = useStaticQuery(graphql`
    query SearchIndexExampleQuery {
      siteSearchIndex {
        index
      }
    }
  `)
  const [query, setQuery] = useState()
  const [results, setResults] = useState()
  let index

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

  return (
    <div
      className="absolute rounded border-2 border-lightGray bg-white z-50"
      style={{ transform: 'translate(-100%)' }}
    >
      <input type="text" value={query} onChange={search} className="rounded" />
      <ul className="">
        {results
          ? results.map(el => (
              <li key={el.id} dangerouslySetInnerHTML={{ __html: el.title }} />
            ))
          : null}
      </ul>
    </div>
  )
}

export default Search
