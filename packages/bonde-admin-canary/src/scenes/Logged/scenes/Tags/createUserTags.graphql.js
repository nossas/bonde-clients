import gql from 'graphql-tag'

export default gql`
  mutation createUserTags($data: Json!){
    createUserTags(input: {
      data: $data
    }) {
      json
    }
  }
`
