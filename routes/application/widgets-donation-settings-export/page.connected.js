import { provideHooks } from 'redial'
import { connect } from 'react-redux'

import * as MobilizationSelectors from '~mobilizations/selectors'
import * as MobilizationActions from '~mobilizations/action-creators'
import * as WidgetActions from '~mobilizations/widgets/action-creators'
import * as WidgetSelectors from '~mobilizations/widgets/selectors'

import WidgetsFormSettingsExportPage from './page'

const redial = {
  fetch: ({ dispatch, getState, params }) => {
    const state = getState()
    const promises = []

    !MobilizationSelectors.hasCurrent(state) && promises.push(
      dispatch(MobilizationActions.select(params.mobilization_id))
    )
    !WidgetSelectors.isLoaded(state) && promises.push(
      dispatch(WidgetActions.asyncWidgetFetch(params.mobilization_id))
    )
    return Promise.all(promises)
  }
}

const mapStateToProps = (state, props) => ({
  widget: WidgetSelectors.getWidget(state, props),
  mobilization: MobilizationSelectors.getCurrent(state),
  loading: state.widgets.dataExport.loading,
  error: state.widgets.dataExport.error,
  success: state.widgets.dataExport.success
})

export default provideHooks(redial)(
  connect(mapStateToProps, WidgetActions)(WidgetsFormSettingsExportPage)
)
