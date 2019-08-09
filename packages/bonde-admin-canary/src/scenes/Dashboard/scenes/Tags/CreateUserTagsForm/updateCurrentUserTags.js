import { CURRENT_USER_QUERY } from 'services/auth'

export default (cache, { data: { createUserTags } }) => {
  if (createUserTags && createUserTags.json) {
    console.log('updateQuery')
    const { currentUser } = cache.readQuery({ query: CURRENT_USER_QUERY })
    cache.writeQuery({
      query: CURRENT_USER_QUERY,
      data: {
        currentUser: {
          ...currentUser,
          tags: createUserTags.json
        }
      }
    })
  }
}
