import React, { useState } from 'react'

import { graphql, Link, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { OutboundLink } from 'gatsby-plugin-google-gtag'

import { facebook, hamburger, search, twitter, youtube } from '../../images' // TODO: use fontawesome here
import Search from './headerSearch'

export const Header = () => {
	const data = useStaticQuery(graphql`
		query Header {
			img: file(relativePath: { eq: "logo.png" }) {
				childImageSharp {
					fluid(maxWidth: 600) {
						...GatsbyImageSharpFluid
					}
				}
			}
			menu: wordpressWpApiMenusMenusItems(slug: { eq: "header-navigation" }) {
				items {
					id: object_id
					title
					url
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
			<button
				className="block lg:hidden text-darkBlue bg-white cursor-pointer"
				onClick={mobileMenu}
			>
				<img className="h-6 md:h-10" src={hamburger} alt="Menu" />
			</button>

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
					{data.menu.items.map(item => (
						<div key={item.id}>
							<h6>
								{/* Return Link or anchor element conditionally */}
								{item.url.slice(0, 37) ===
								`https://allianceforpatientaccess.org/` ? (
									<Link className="uppercase" to={`/${item.url.slice(37)}`}>
										{item.title}
									</Link>
								) : (
									<OutboundLink
										target="_blank"
										className="uppercase"
										href={item.url}
									>
										{item.title}
									</OutboundLink>
								)}
							</h6>
						</div>
					))}
				</section>

				{/* SOCIAL LINKS */}
				<section className="xxs:w-1/2 lg:w-1/6 pb-2 lg:p-0 flex justify-around items-center">
					<div>
						<OutboundLink
							target="_blank"
							href="https://facebook.com/patientaccess"
						>
							<img alt="Facebook" src={facebook} />
						</OutboundLink>
					</div>

					<div>
						<OutboundLink
							target="_blank"
							href="https://twitter.com/patientaccess"
						>
							<img alt="Twitter" src={twitter} />
						</OutboundLink>
					</div>

					<div>
						<OutboundLink
							target="_blank"
							href="https://www.youtube.com/channel/UCnFUTFIj5E8jMNbmkZbiRMw"
						>
							<img alt="YouTube" src={youtube} />
						</OutboundLink>
					</div>

					<div className="relative cursor-pointer">
						<img
							alt="Search"
							src={search}
							onClick={() => setShowSearch(!showSearch)}
						/>
						<Search show={showSearch} setShow={setShowSearch} />
					</div>
				</section>
			</div>
		</header>
	)
}

export default Header
