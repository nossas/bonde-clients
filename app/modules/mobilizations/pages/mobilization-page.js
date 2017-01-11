import React, { Component, PropTypes } from 'react'
import { Navigation } from 'react-router'
import reactMixin from 'react-mixin'
import { connect } from 'react-redux'

import * as MobilizationSelectors from '../selectors'
import { Mobilization } from '../components'

import * as Paths from '../../../scripts/Mobilization/plugins/Templates/MobilizationTemplatesPaths'


@reactMixin.decorate(Navigation)
export class MobilizationPage extends Component {

  componentDidMount() {
    const { mobilization, blocksIsLoaded, blocks } = this.props
    if (blocksIsLoaded && blocks.length === 0) {
      this.transitionTo(Paths.mobilizationTemplatesChoose(mobilization))
    }
  }

  render() {
    return <Mobilization {...this.props} editable={true} />
  }
}

MobilizationPage.propTypes = {
  mobilization: PropTypes.object,
  blocks: PropTypes.array,
  blockEditionMode: PropTypes.bool,
  widgets: PropTypes.array
}

const mapStateToProps = state => ({
  mobilization: MobilizationSelectors.getCurrent(state),
  blocksIsLoaded: MobilizationSelectors.blocksIsLoaded(state),
  blocks: MobilizationSelectors.getBlocks(state),
  widgets: MobilizationSelectors.getWidgets(state),
  // TODO: Refactor to selectors
  blockEditionMode: state.blocks.editionMode
})

export default connect(mapStateToProps)(MobilizationPage)
