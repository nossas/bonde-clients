import { translate } from 'services/i18n'
import { query } from 'graphql'
import { AllCommunities } from 'graphql/queries'
import CommunitiesDropdown from './CommunitiesDropdown'

export default query({
  query: AllCommunities.query,
  props: AllCommunities.props
})(translate('header')(CommunitiesDropdown))
