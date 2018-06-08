import Mobilizations from './Mobilizations.gql'

export default {
  mutation: Mobilizations,
  props: ({ loading, data }) => ({
    loading,
    mobilizations: data && data.mobilizations && data.mobilizations.json
    ? JSON.parse(data.mobilizations.json)
    : []
  }),
}
