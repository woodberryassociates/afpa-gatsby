import { graphql } from 'gatsby'
import React from 'react'

import IcerResources from '../components/icerPage/icerResources'
import IcerSpeakers from '../components/icerPage/icerSpeakers'
import Layout from '../components/layout'
import SEO from '../components/seo'

const IcerPage = ({
	data: {
		page: { title, content, featured_media },
	},
}) => (
	<Layout>
		<SEO title={title} />
		<div className="mt-2 lg:mt-10 mb-10 mx-2 md:mx-32 xxl:mx-64 pb-10">
			{/* Title */}
			<h4 className="text-center" dangerouslySetInnerHTML={{ __html: title }} />

			{/* Content */}
			<div className="content flex flex-col">
				<div dangerouslySetInnerHTML={{ __html: content }} />
			</div>

			{/* Video Player */}
			<div
				className="w-full m-auto relative"
				style={{ paddingBottom: `56.25%` }}
			>
				<iframe
					src="https://www.youtube.com/embed/U6Sizkp9i94?start=298"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					frameBorder="0"
					width="100%"
					height="100%"
					style={{
						position: `absolute`,
						top: 0,
						left: 0,
						width: `100%`,
						height: `100%`,
					}}
					title="ICER"
				></iframe>
			</div>

			<p className="mt-3 mb-5 text-center">
				For questions or to get involved email Casey McPherson at{` `}
				<a
					href="mailto:CMcPherson@AllianceForPatientAccess.org"
					className="text-lightBlue"
				>
					CMcPherson@AllianceForPatientAccess.org
				</a>
				.
			</p>

			<div className="mt-8 grid grid-cols-1 col-gap-6 md:grid-cols-2 xxl:grid-cols-6">
				{/* Q & A (powered by slido) */}
				<div className="xxl:col-start-2 xxl:col-span-2">
					<h5>Q & A</h5>
					<iframe
						src="https://app.sli.do/event/rfjrqrv4"
						width="100%"
						height="100%"
						frameBorder="0"
						style={{ minHeight: `560px` }}
						title="Slido"
					></iframe>
				</div>

				{/* Featured Speakers */}
				<IcerSpeakers className="xxl:col-span-2" />
			</div>
		</div>

		{/* Featured Resources */}
		<IcerResources />

		{/* Agenda */}
		<div className="px-2 md:px-32 lg:px-64 pt-10 pb-64">
			{/* Header */}
			<div className="mb-8 text-center">
				<p>
					<b>Clinician Voices for Patient Access</b>
				</p>
				<p>
					<b>August 25, 2021</b>
				</p>
			</div>

			{/* Schedule */}
			<ul>
				<li className="mb-3">
					<p>
						12:00 PM - 12:05 PM ET – <b>Introduction</b>
					</p>
					<p>Josie Cooper, Executive Director – Alliance for Patient Access</p>
				</li>

				<li className="my-3">
					<p>
						12:05 PM – 12:10 PM ET – <b>Overview of Severe Asthma</b>
					</p>
					<p>
						Jenna Riemenschneider, Director of Policy and Advocacy – Asthma and
						Allergy Foundation of America
					</p>
				</li>

				<li className="my-3">
					<p>
						12:10 PM - 12:20 PM ET – <b>ICER 101</b>
					</p>
					<p>
						Michelle Winokur, DrPH, Executive Director – Institute for Patient
						Access
					</p>
				</li>

				<li className="my-3">
					<p>
						12:20-12:25 PM ET – <b>Patient Advocate Perspective</b>
					</p>
					<p>Tonya Winders, President and CEO – Allergy and Asthma Network</p>
				</li>

				<li className="my-3">
					<p>
						12:25-12:35 PM ET – <b>Clinician Perspective</b>
					</p>
					<p>
						Allen Meadows, MD – Chairman of AfPA’s Respiratory Therapy Access
						Working Group
					</p>
				</li>

				<li className="my-3">
					<p>
						12:35-12:45 PM ET – <b>Call to Action</b>
					</p>
					<p>Josie Cooper, Executive Director – Alliance for Patient Access</p>
				</li>

				<li className="mt-3">
					<p>
						12:45 PM - 12:50 PM ET – <b>Q&A </b>
					</p>
				</li>
			</ul>
		</div>
	</Layout>
)

export const pageQuery = graphql`
	query IcerPageQuery {
		page: wordpressPage(wordpress_id: { eq: 1462 }) {
			id
			title
			content
		}
	}
`

export default IcerPage
