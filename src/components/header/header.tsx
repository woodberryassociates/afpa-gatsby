import { graphql, Link, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React, { useState } from 'react'

import { facebook, hamburger, search, twitter, youtube } from '../../images' // TODO: use fontawesome here
import Search from './headerSearch'

const Header = () => {
	const data = useStaticQuery(graphql`
		query {
			img: file(relativePath: { eq: "logo.png" }) {
				childImageSharp {
					fluid(maxWidth: 600) {
						...GatsbyImageSharpFluid
					}
				}
			}
		}
	`)
	const [showSearch, setShowSearch] = useState(false)
	const [showMenu, setShowMenu] = useState(false)
	const mobileMenu = e => {
		e.preventDefault()
		setShowMenu(!showMenu)
	}

	return (
		<header className="relative xxl:px-32 min-h-65 text-darkBlue bg-white flex flex-wrap justify-around items-center">
			{/* HAMBURGER MENU */}
			<a
				className="block lg:hidden text-darkBlue cursor-pointer"
				onClick={mobileMenu}
			>
				<img className="h-6 md:h-10" src={hamburger} alt="Menu" />
			</a>

			{/* LOGO */}
			<div className="w-1/2 sm:1/3 lg:w-1/4">
				<h6>
					<Link to="/">
						<Img fluid={data.img.childImageSharp.fluid} />
					</Link>
				</h6>
			</div>

			<div
				className={`z-40 w-full lg:w-3/4 lg:visible lg:opacity-100 absolute bottom-0 lg:static flex flex-col lg:flex-row justify-between items-center bg-white leading-loose headerNav ${
					showMenu ? `visible opacity-100` : `invisible opacity-0`
				}`}
				style={{ transition: `all .25s ease-in` }}
			>
				{/* TEXT LINKS */}
				<section className="px-10 xl:px-16 lg:w-5/6 flex flex-col lg:flex-row justify-around items-center text-base">
					<div>
						<h6>
							<Link className="" to="/about">
								ABOUT
							</Link>
						</h6>
					</div>

					<div>
						<h6>
							<Link className="" to="/events">
								EVENTS
							</Link>
						</h6>
					</div>

					<div>
						<h6>
							<Link className="" to="/advocacy">
								ADVOCACY
							</Link>
						</h6>
					</div>

					<div>
						<h6>
							<Link className="whitespace-no-wrap" to="/afpa-state-chapters">
								STATE CHAPTERS
							</Link>
						</h6>
					</div>

					<div>
						<h6>
							<Link className="" to="/surveyhub">
								SURVEYHUB
							</Link>
						</h6>
					</div>
				</section>

				{/* SOCIAL LINKS */}
				<section className="xxs:w-1/2 lg:w-1/6 pb-2 lg:p-0 flex justify-around items-center">
					<div>
						<a href="https://facebook.com/patientaccess">
							<img src={facebook} />
						</a>
					</div>

					<div>
						<a href="https://twitter.com/patientaccess">
							<img src={twitter} />
						</a>
					</div>

					<div>
						<a href="https://www.youtube.com/channel/UCnFUTFIj5E8jMNbmkZbiRMw">
							<img src={youtube} />
						</a>
					</div>

					<div className="relative cursor-pointer">
						<img src={search} onClick={() => setShowSearch(!showSearch)} />
						<Search show={showSearch} setShow={setShowSearch} />
					</div>
				</section>
			</div>
		</header>
	)
}

export default Header
