//import { query } from 'graphql'
import { translate } from 'services/i18n'
//import trendingMobilizationsQuery from './query.graphql'
import TrendingMobilizationsGadget from './TrendingMobilizationsGadget'

//export default query({
//  query: trendingMobilizationsQuery,
//  variables: { first: 4, days: 2 },
//  props: ({ loading, data }) => {
//    return {
//      loading,
//      mobilizations: data && data.trendingMobilizations
//        ? data.trendingMobilizations.nodes
//        : undefined
//    }
//  }
//})(translate('home')(TrendingMobilizationsGadget))

export default translate('home')(TrendingMobilizationsGadget)
