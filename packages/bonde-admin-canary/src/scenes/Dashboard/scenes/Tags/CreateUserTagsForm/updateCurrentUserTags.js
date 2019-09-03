export default (readQuery, writeQuery, { createUserTags }) => {
  if (createUserTags && createUserTags.json) {
    const { currentUser } = readQuery()
    writeQuery({
      currentUser: {
        ...currentUser,
        tags: createUserTags.json
      }
    })
  }
}
