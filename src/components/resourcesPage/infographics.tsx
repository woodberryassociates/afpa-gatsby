import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React, { useState } from 'react'

import { goDown, goUp, pagination } from './pagination'

const Infographics = () => {
	const data = useStaticQuery(graphql`
		query Infographics {
			allWordpressWpInfographics {
				edges {
					node {
						id
						acf {
							link
						}
						title
						featured_media {
							localFile {
								childImageSharp {
									fluid(maxWidth: 500) {
										...GatsbyImageSharpFluid
									}
								}
							}
						}
					}
				}
			}
		}
	`)
	const infographics: object[] = pagination(
		data.allWordpressWpInfographics.edges,
		6
	)
	const [selectedPage, setSelectedPage] = useState(0)

	return (
		<div className="flex flex-col items-center">
			<div
				className="lg:min-w-10/12 lg:w-10/12 flex flex-wrap justify-start items-start"
				style={{ minHeight: '894px' }}
			>
				{(infographics[selectedPage] as any).map(infographic => {
					infographic = infographic.node
					return (
						<a
							key={infographic.id}
							href={infographic.acf.link}
							className="w-1/3 h-1/2 p-2"
						>
							<Img
								className="max-h-335"
								fluid={
									infographic.featured_media.localFile.childImageSharp.fluid
								}
							/>
							<h5
								className="text-darkGray"
								dangerouslySetInnerHTML={{ __html: infographic.title }}
							/>
						</a>
					)
				})}
			</div>

			<div className="flex mt-4">
				<button
					className="mx-2 w-32"
					onClick={() =>
						goDown(selectedPage, infographics.length, setSelectedPage)
					}
				>
					Back
				</button>
				<button
					className="mx-2 w-32"
					onClick={() =>
						goUp(selectedPage, infographics.length, setSelectedPage)
					}
				>
					Next
				</button>
			</div>
		</div>
	)

	// return (
	//   <CarouselProvider
	//     className="w-full"
	//     naturalSlideWidth={1275}
	//     naturalSlideHeight={800}
	//     totalSlides={infographics.length}
	//   >
	//     <CarouselSlider>
	//       {infographics.map((page, i) => (
	//         <CarouselSlide
	//           className="pagedSlider"
	//           key={i + (page as any).length}
	//           index={i}
	//         >
	//           {(page as any).map(infographic => {
	//             infographic = infographic.node
	//             return (
	//               <a key={infographic.id} href={infographic.acf.link}>
	//                 <Img
	//                   className="max-h-335"
	//                   fluid={
	//                     infographic.featured_media.localFile.childImageSharp.fluid
	//                   }
	//                 />
	//                 <h5
	//                   className="text-darkGray"
	//                   dangerouslySetInnerHTML={{ __html: infographic.title }}
	//                 />
	//               </a>
	//             )
	//           })}
	//         </CarouselSlide>
	//       ))}
	//     </CarouselSlider>
	//     <div className="flex justify-center">
	//       <div className="w-64 relative bottom-100 flex justify-between">
	//         <ButtonBack>Back</ButtonBack>
	//         <ButtonNext>Next</ButtonNext>
	//       </div>
	//     </div>
	//   </CarouselProvider>
	// )
}

export default Infographics
