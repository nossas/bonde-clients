//
// @route /subscriptions/:id/edit
//
import qs from 'query-string'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import AwaitSelectors from '../../../components/await/redux/selectors'
import {
  asyncSubscriptionDelete,
  asyncSubscriptionFetch,
  setModificationType
} from '../../../subscriptions/redux/action-creators'
import SubscriptionEditSelectors from '../../../subscriptions/redux/selectors/edit'
import Page from './page'

const mapStateToProperties = (state, properties) => {
  const selectors = SubscriptionEditSelectors(state)
  const { location: { search } } = properties

  return {
    modificationType: selectors.getModificationType(),
    card: selectors.getCard(),
    query: qs.parse(search),
    data: selectors.getData(),
    loading: AwaitSelectors(state).getLoading()
  }
}

const mapDispatchToProperties = {
  asyncSubscriptionDelete,
  setModificationType,
  asyncSubscriptionFetch
}

export default connect(mapStateToProperties, mapDispatchToProperties)(injectIntl(Page))
