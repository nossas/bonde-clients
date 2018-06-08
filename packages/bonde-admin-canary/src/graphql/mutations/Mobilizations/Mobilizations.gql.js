import gql from 'graphql-tag'

export default gql`
  mutation Mobilizations($days: Int!) {
    mobilizations(input: { days: $days }) {
      json
    }
  }
`
