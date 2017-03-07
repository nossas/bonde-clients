import { connect } from 'react-redux'

import * as MobActions from '~client/mobrender/redux/action-creators'
import MobSelectors from '~client/mobrender/redux/selectors'

import Page from './page'

const mapStateToProps = (state, props) => {
  const selectors = MobSelectors(state, props)
  return {
    mobilization: selectors.getMobilization(),
    renderIsLoading: selectors.renderIsLoading()
  }
}

const mapActionsToProps = {
  fetchBlocks: MobActions.asyncFetchBlocks,
  fetchWidgets: MobActions.asyncFetchWidgets
}

export default connect(mapStateToProps, mapActionsToProps)(Page)
