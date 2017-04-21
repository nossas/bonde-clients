import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import * as SubscriptionActions from '~client/subscriptions/redux/action-creators'
import SubscriptionEditSelectors from '~client/subscriptions/redux/selectors/edit'
import Page from './page'

const redial = {
  fetch: ({ dispatch, params, query }) => {
    return dispatch(SubscriptionActions.asyncSubscriptionFetch({
      id: params.id,
      token: query.token
    }))
  }
}

const mapStateToProps = state => {
  const selectors = SubscriptionEditSelectors(state)
  return {
    modificationType: selectors.getModificationType(),
    animationStack: selectors.getAnimationStack(),
    url: state.sourceRequest.url,
    card: selectors.getCard()
  }
}

const mapDispatchToProps = SubscriptionActions

export default provideHooks(redial)(
  connect(mapStateToProps, mapDispatchToProps)(Page)
)
