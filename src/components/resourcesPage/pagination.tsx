/**
 * PAGINATION
 *
 * @TODO may be able to move this to gatsby-node & use graphql's
 * native functionality
 * https://nickymeuleman.netlify.com/blog/gatsby-pagination
 */
const pagination = (data, NUM_PER_PAGE) => {
	const tempArr: object[] = data
	const pagedArr: object[] = []

	// TODO: drop the for loop for a declarative/HO model
	for (let i = 0; i < tempArr.length; i += NUM_PER_PAGE)
		pagedArr.push(tempArr.slice(i, i + NUM_PER_PAGE))
	return pagedArr
}

const goUp = (pageNum, arrLength, setPage) => {
	pageNum++
	if (pageNum === arrLength) pageNum = 0
	setPage(pageNum)
}

const goDown = (pageNum, arrLength, setPage) => {
	pageNum--
	if (pageNum === -1) pageNum = arrLength - 1
	setPage(pageNum)
}

export { pagination, goUp, goDown }
