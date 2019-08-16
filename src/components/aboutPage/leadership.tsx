import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'

const Leadership = ({ associateMembership: membership }) => {
  const data = useStaticQuery(graphql`
    query Leadership {
      wordpressWpLeadership(tags: { elemMatch: { slug: { eq: "chairman" } } }) {
        title
        content
        acf {
          location
        }
        featured_media {
          localFile {
            childImageSharp {
              fixed(height: 465, width: 400) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
      allWordpressWpLeadership(
        filter: { tags: { elemMatch: { slug: { ne: "chairman" } } } }
      ) {
        edges {
          node {
            title
            content
            acf {
              location
            }
            featured_media {
              localFile {
                childImageSharp {
                  fixed(height: 295, width: 250) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const chairman = data.wordpressWpLeadership
  const leadership = data.allWordpressWpLeadership.edges

  return (
    <div className="p-32 flex flex-col justify-between items-center">
      <h5 className="text-afpaGreen">About the Chairman</h5>
      <div className="mx-32 flex justify-between bg-white">
        <div className="w-2/3 p-20 flex flex-col justify-center">
          <h5 className="leading-snug">{chairman.title}</h5>
          <h3 className="text-lightBlue leading-snug">
            {chairman.acf.location}
          </h3>
          <div
            className="my-3 font-light"
            dangerouslySetInnerHTML={{ __html: chairman.content }}
          />
        </div>
        <Img fixed={chairman.featured_media.localFile.childImageSharp.fixed} />
      </div>

      <h5 className="text-afpaGreen">AfPA Leadership</h5>
      <div className="flex flex-wrap justify-between">
        {leadership.map(({ key, node: member }) => (
          <div key={key} className="flex lg:w-1/2">
            <Img
              fixed={member.featured_media.localFile.childImageSharp.fixed}
            />
            <div className="w-2/3 mx-6 my-2">
              <h5 className="leading-snug text-white">{member.title}</h5>
              <h3 className="leading-snug text-lightBlue">
                {member.acf.location}
              </h3>
              <div
                className="my-3 text-white font-light"
                dangerouslySetInnerHTML={{ __html: member.content }}
              />
            </div>
          </div>
        ))}
      </div>
      <h5>Associate Membership in the AfPA</h5>
      <p
        className="lg:w-2/3 text-white font-light text-center"
        dangerouslySetInnerHTML={{ __html: membership }}
      />
    </div>
  )
}

export default Leadership
