import { connect } from 'react-redux'
import * as SubscriptionActions from '~client/subscriptions/redux/action-creators'
import SubscriptionEditSelectors from '~client/subscriptions/redux/selectors/edit'
import Page from './page'

const mapStateToProps = state => {
  const selectors = SubscriptionEditSelectors(state)
  return {
    modificationType: selectors.getModificationType(),
    animationStack: selectors.getAnimationStack()
  }
}

const mapDispatchToProps = SubscriptionActions

export default connect(mapStateToProps, mapDispatchToProps)(Page)
