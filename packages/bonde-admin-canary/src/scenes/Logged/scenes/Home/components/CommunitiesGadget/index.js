//import { query } from 'graphql'
//import { AllCommunities } from 'graphql/queries'
import { translate } from 'services/i18n'
import CommunitiesGadget from './CommunitiesGadget'

//export default query({
//  query: AllCommunities.query,
//  props: AllCommunities.props
//})(translate('home')(CommunitiesGadget))

export default translate('home')(CommunitiesGadget)
