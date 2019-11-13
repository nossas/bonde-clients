export default (readQuery, writeQuery, { insert_user_tags }) => {
	const { returning } = insert_user_tags
  if (returning && returning.length > 0) {
    const { currentUser } = readQuery()
  	const user = {
  		...currentUser,
  		tags: JSON.stringify(returning.map(userTag => userTag.tag.name))
  	}
    writeQuery({ currentUser: user })
  }
}
