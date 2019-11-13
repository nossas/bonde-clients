import gql from 'graphql-tag'

export default gql`
  mutation CreateUserTags($tags: [user_tags_insert_input!]!){
    insert_user_tags(objects: $tags) {
      returning {
	      id
	      tag {
	        id
	        name
	      }
	      user_id
	    }
    }
  }
`
