import Img from 'gatsby-image'
import { OutboundLink } from 'gatsby-plugin-google-gtag'
import React from 'react'

const ResourceCard: JSX.IntrinsicAttributes & React.FC<any> = ({
	resource: {
		node: {
			title,
			acf: { textLink, link_text, author },
			featured_media,
		},
	},
}) => (
	<div className="my-10 flex flex-wrap sm:flex-no-wrap justify-around curEventCard:justify-between bg-white cardShadow curEventCard">
		{featured_media ? (
			<Img
				className="curEventCardImg self-center"
				imgStyle={{
					objectFit: `contain`,
				}}
				fixed={featured_media.localFile.childImageSharp.fixed}
			/>
		) : null}

		<div className="m-5 curEventCard:w-1/2">
			{/* Title */}
			<p
				dangerouslySetInnerHTML={{ __html: title }}
				className="my-2 text-xl text-lightBlue"
			/>
			{/* Blurb */}
			<p dangerouslySetInnerHTML={{ __html: author }} className="text-sm" />
		</div>

		{/* Survey Link */}
		<OutboundLink
			target="_blank"
			className="mr-10 mb-2 curEventCard:mb-0 self-center"
			href={textLink}
		>
			<button className="whitespace-no-wrap">{link_text}</button>
		</OutboundLink>
	</div>
)

export default ResourceCard
