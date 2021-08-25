import { graphql, useStaticQuery } from 'gatsby'

export const useGravityData = () => {
	const { allGfForm } = useStaticQuery(
		graphql`
			query GravityForms {
				allGfForm {
					edges {
						node {
							formId
							slug
							apiURL
							descriptionPlacement
							formFields {
								id
								label
								labelPlacement
								description
								descriptionPlacement
								type
								choices
								content
								errorMessage
								inputMaskValue
								isRequired
								visibility
								cssClass
								placeholder
								size
								defaultValue
								maxLength
							}
							button {
								text
							}
							confirmations {
								message
							}
						}
					}
				}
			}
		`
	)
	return allGfForm
}
