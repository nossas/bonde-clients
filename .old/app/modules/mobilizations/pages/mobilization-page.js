import React, { Component, PropTypes } from 'react'
import { Navigation } from 'react-router'
import reactMixin from 'react-mixin'
import { connect } from 'react-redux'

// Global module dependencies
import * as Paths from '../../../scripts/Mobilization/plugins/Templates/MobilizationTemplatesPaths'

// Children module dependencies
<<<<<<< HEAD
import {
  selectors as BlockSelectors,
  actions as BlockActions
} from '../../../modules/mobilizations/blocks'
import {
  selectors as WidgetSelectors,
  actions as WidgetActions
} from '../../../modules/widgets'
=======
import { selectors as BlockSelectors } from '../../../modules/mobilizations/blocks'
import { selectors as WidgetSelectors } from '../../../modules/widgets'
>>>>>>> d93940b3... Merge app structure of branch develop into .old directory #316

// Current module dependencies
import * as MobilizationSelectors from '../selectors'
import { Mobilization } from '../components'

@reactMixin.decorate(Navigation)
export class MobilizationPage extends Component {

  componentDidMount() {
    const { mobilization, blocksIsLoaded, blocks } = this.props
    if (blocksIsLoaded && blocks.length === 0) {
      this.transitionTo(Paths.mobilizationTemplatesChoose(mobilization))
    }
  }

  render() {
    return <Mobilization {...this.props} editable />
  }
}

MobilizationPage.propTypes = {
  mobilization: PropTypes.object,
  blocks: PropTypes.array,
  blocksIsLoaded: PropTypes.bool,
  blockEditionMode: PropTypes.bool,
<<<<<<< HEAD
  blockUpdate: PropTypes.func,
=======
>>>>>>> d93940b3... Merge app structure of branch develop into .old directory #316
  widgets: PropTypes.array
}

const mapStateToProps = state => ({
  mobilization: MobilizationSelectors.getCurrent(state),
  blocks: BlockSelectors.getList(state),
  blocksIsLoaded: BlockSelectors.isLoaded(state),
<<<<<<< HEAD
  blockIsRequest: BlockSelectors.isRequesting(state),
=======
>>>>>>> d93940b3... Merge app structure of branch develop into .old directory #316
  blockEditionMode: BlockSelectors.isEditionMode(state),
  widgets: WidgetSelectors.getList(state),
  auth: state.auth
})

<<<<<<< HEAD
const mapActionCreatorsToProps = {
  blockUpdate: BlockActions.asyncBlockUpdate,
  setEditionMode: BlockActions.setEditionMode,
  blockDestroy: BlockActions.asyncBlockDestroy,
  blockMove: (direction, payload) => dispatch => {
    if (direction === 'up') {
      dispatch(BlockActions.asyncBlockMoveUp(payload))
    } else if (direction === 'down') {
      dispatch(BlockActions.asyncBlockMoveDown(payload))
    }
  },
  widgetUpdate: WidgetActions.asyncWidgetUpdate
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(MobilizationPage)
=======
export default connect(mapStateToProps)(MobilizationPage)
>>>>>>> d93940b3... Merge app structure of branch develop into .old directory #316
