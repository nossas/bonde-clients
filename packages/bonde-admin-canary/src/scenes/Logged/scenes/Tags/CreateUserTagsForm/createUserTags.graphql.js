import gql from 'graphql-tag'

export default gql`
  mutation CreateUserTags($data: JSON!){
    createUserTags(input: {
      data: $data
    }) {
      json
    }
  }
`
