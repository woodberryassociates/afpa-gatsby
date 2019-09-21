import { Index } from 'elasticlunr'
import { graphql, useStaticQuery } from 'gatsby'
import React, { Component, useEffect, useState } from 'react'

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

  useEffect(() => inputRef.focus())

  return (
    <div
      className="z-50 absolute rounded border-2 border-lightGray bg-white text-darkBlue text-xl"
      style={{ transform: 'translate(-100%)' }}
    >
      <input
        type="text"
        value={query}
        onChange={search}
        ref={input => (inputRef = input)}
        className="lg:w-500 rounded border-b"
      />
      <ul>
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
