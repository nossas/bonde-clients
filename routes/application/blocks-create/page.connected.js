import { provideHooks } from 'redial'
import { connect } from 'react-redux'

import * as MobilizationActions from '~mobilizations/action-creators'
import * as MobilizationSelectors from '~mobilizations/selectors'
import * as BlockSelectors from '~mobilizations/blocks/selectors'

import BlocksCreatePage from './page'

const redial = {
  fetch: ({ dispatch, getState, params }) => {
    const state = getState()
    const promises = []

    !MobilizationSelectors.hasCurrent(state) && promises.push(
      dispatch(MobilizationActions.select(params.mobilization_id))
    )
    return Promise.all(promises)
  }
}

const mapStateToProps = state => ({
  mobilization: MobilizationSelectors.getCurrent(state),
  blocks: BlockSelectors.getList(state),
  selectedLayout: state.blocks.selectedLayout,
  uploadingBackgroundImage: state.blocks.uploadingBackgroundImage,
  uploadedBackgroundImage: state.blocks.uploadedBackgroundImage,
  selectedColor: state.colorPicker.color
})

export default provideHooks(redial)(connect(mapStateToProps)(BlocksCreatePage))
