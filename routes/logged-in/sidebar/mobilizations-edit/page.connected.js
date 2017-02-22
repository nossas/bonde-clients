import { provideHooks } from 'redial'
import { connect } from 'react-redux'

import * as MobActions from '~client/mobrender/redux/action-creators'
import MobSelectors from '~client/mobrender/redux/selectors'
import { EDIT_KEY } from '~client/mobrender/components/block-config-menu'
/*
import * as BlockActions from '~mobilizations/blocks/action-creators'
import * as BlockSelectors from '~mobilizations/blocks/selectors'
import * as WidgetActions from '~mobilizations/widgets/action-creators'
import * as WidgetSelectors from '~mobilizations/widgets/selectors'
*/

import Page from './page'

const redial = {
  fetch: ({ dispatch, getState, params }) => {
    const state = getState()
    const promises = []

    const selectors = MobSelectors(getState())

    !selectors.blocksIsLoaded() && promises.push(
      dispatch(MobActions.asyncFetchBlocks(params.mobilization_id))
    )
    !selectors.widgetsIsLoaded() && promises.push(
      dispatch(MobActions.asyncFetchWidgets(params.mobilization_id))
    )
    !selectors.getMobilization() && promises.push(
      dispatch(MobActions.selectMobilization(params.mobilization_id))
    )
    return Promise.all(promises)
  }
}

const mapStateToProps = (state, props) => {
  const selectors = MobSelectors(state, props)
  return {
    mobilization: selectors.getMobilization(),
    blocks: selectors.getBlocks(),
    blockEditionMode: selectors.getEditing() === EDIT_KEY,
    blocksIsLoaded: selectors.blocksIsLoaded(),
    renderIsLoading: selectors.renderIsLoading(),
    widgets: selectors.getWidgets(),
  }
}

export default provideHooks(redial)(connect(mapStateToProps)(Page))
