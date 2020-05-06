import React from 'react'

import {
	graphql,
	Link,
	useStaticQuery
} from 'gatsby'
import GravityFormForm from 'gatsby-gravityforms-component'
import Img from 'gatsby-image'

import { useGravityData } from '../hooks/gravityForms'
import {
	facebook_light,
	twitter_light,
	youtube_light
} from '../images'

const Footer = () => {
	const data = useStaticQuery(graphql`
		query {
			img: file(relativePath: { eq: "logo-light.png" }) {
				childImageSharp {
					fixed(width: 600) {
						...GatsbyImageSharpFixed
					}
				}
			}
		}
	`)

	return (
		<footer className="footerClip bg-lightBlue text-white text-sm font-light tracking-wider -mt-64">
			<div className="mx-2 md:mx-32 py-12 pt-24 min-h-250 flex flex-col xs:flex-row justify-between items-center xs:items-end">
				{/* LINKS */}
				<div className="flex flex-col justify-end leading-loose">
					<Link className="uppercase" to="afpa-state-chapters">
						State Chapters
					</Link>
					<a className="uppercase" href="https://gafpa.org/">
						Global AfPA
					</a>
					<a className="uppercase" href="https://instituteforpatientaccess.org">
						Institute for Patient Access
					</a>
					<a
						className="uppercase"
						href="mailto:info@allianceforpatientaccess.org"
					>
						Contact
					</a>
					{/* <Link className="uppercase" to="donate">DONATE</Link> */}
				</div>

				{/* NEWSLETTER SUBSCRIPTION */}
				<div className="flex flex-col justify-end">
					<Img className="my-3 -mx-3" fixed={data.img.childImageSharp.fixed} />
					<p>SUBSCRIBE TO OUR NEWSLETTER</p>
					<div className="bg-white h-px w-10 my-5" />
					<GravityFormForm
						id={1}
						formData={useGravityData()}
						lambda={process.env.GATSBY_LAMBDA_ENDPOINT}
						maxLength={() => null}
					/>
				</div>
			</div>

			{/* FOOT */}
			<div className="px-2 lg:px-32 bg-darkBlue h-40 lg:h-16 text-xs flex justify-between items-center">
				{/* CREDIT */}
				<div className="pr-3">
					© {new Date().getFullYear()}, Alliance for Patient Access.
				</div>

				{/* AfPA INFO */}
				<div className="flex flex-wrap">
					<div className="flex items-center flex-wrap">
						<a
							href="https://www.google.com/maps/place/1275+Pennsylvania+Ave+NW"
							className="mr-6 lg:mr-0"
						>
							1275 Pennsylvania Ave. NW, Suite 1100A
							<br />
							Washington, DC 20004-2417
						</a>

						<div className="my-3 md:mx-6 flex flex-col">
							<a href="mailto:info@allianceforpatientaccess.org">
								info@allianceforpatientaccess.org
							</a>
							<a href="tel:202-499-4114">202-499-4114</a>
						</div>
					</div>

					{/* AfPA SOCIAL LINKS */}
					<div className="flex justify-between items-center min-w-120 fill-current">
						<a href="https://www.facebook.com/patientaccess/">
							<img className="h-4" alt="Facebook" src={facebook_light} />
						</a>

						<a href="https://twitter.com/patientaccess">
							<img className="h-4" alt="Twitter" src={twitter_light} />
						</a>

						<a href="https://www.youtube.com/channel/UCnFUTFIj5E8jMNbmkZbiRMw">
							<img className="h-4" alt="YouTube" src={youtube_light} />
						</a>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
