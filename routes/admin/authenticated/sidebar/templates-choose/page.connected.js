import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import MobSelectors from '~client/mobrender/redux/selectors'
import { selectMobilization, asyncUpdateMobilization } from '~client/mobrender/redux/action-creators'
import * as TemplateActions from '~client/mobilizations/templates/action-creators'
import * as TemplateSelectors from '~client/mobilizations/templates/selectors'
import * as paths from '~client/paths'

import Page from './page'

const redial = {
  fetch: ({ dispatch, getState, params }) => {
    const state = getState()
    const promises = []

    // TODO: Check if this code is necessary
    !MobSelectors(getState()).getMobilization() && promises.push(
      dispatch(selectMobilization(params.mobilization_id))
    )
    !TemplateSelectors.isLoaded(state) && promises.push(
      dispatch(TemplateActions.asyncFetch())
    )
    return Promise.all(promises)
  }
}

const mapStateToProps = state => ({
  mobilization: MobSelectors(state).getMobilization(),
  templatesGlobal: TemplateSelectors.getGlobalTemplates(state),
  templatesCustomLength: TemplateSelectors.getCustomTemplates(state).length
})

const mapActionsToProps = (dispatch, props) => ({
  createMobilizationFromTemplate: ({ mobilization, template }) => {
    dispatch(asyncUpdateMobilization({
      id: mobilization.id,
      template_mobilization_id: template.id
    }))
    .then(() => {
      browserHistory.push(paths.editMobilization(mobilization.id))
    })
  }
})

export default provideHooks(redial)(
  connect(mapStateToProps, mapActionsToProps)(Page)
)
