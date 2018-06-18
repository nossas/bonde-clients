
import { query } from 'graphql'
import { translate } from 'services/i18n'
import trendingMobilizationsQuery from './query.graphql'
import TrendingMobilizationsGadget from './TrendingMobilizationsGadget'

export default query({
  query: trendingMobilizationsQuery,
  variables: { first: 4, days: 2 },
  props: ({ loading, data }) => {
    console.log('trendingMobilizations', data)
    return {
      loading,
      trendingMobilizations: data && data.trendingMobilizations
        ? data.trendingMobilizations.nodes
        : undefined
    }
  }
})(translate('home')(TrendingMobilizationsGadget))
