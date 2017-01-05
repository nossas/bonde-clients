import React, { Component, PropTypes } from 'react'
import { Navigation } from 'react-router'
import reactMixin from 'react-mixin'
import { connect } from 'react-redux'

import { selectors as MobilizationSelectors } from '../../../modules/mobilizations'
import { Mobilization } from '../../../modules/mobilizations/components'

import * as Paths from '../../Paths'


@reactMixin.decorate(Navigation)
class EditMobilizationPage extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      scrolledToBottom: props.scrolledToBottom,
      widgetsCount: props.widgetsCount
    }
  }

  componentDidUpdate() {
    const { mobilization, blocks } = this.props
    if (blocks.length === 0) {
      this.transitionTo(Paths.createBlock(mobilization))
    }
  }

  newBlock() {
    const { location } = this.props
    return location.query && location.query.newBlock && location.query.newBlock === 'true'
  }

  render() {
    return <Mobilization {...this.props} editable={true} />
  }
}

EditMobilizationPage.propTypes = {
  mobilization: PropTypes.object,
  blocks: PropTypes.array,
  blockEditionMode: PropTypes.bool,
  widgets: PropTypes.array
}

const mapStateToProps = state => ({
  mobilization: MobilizationSelectors.getCurrent(state),
  blocks: MobilizationSelectors.getBlocks(state),
  widgets: MobilizationSelectors.getWidgets(state),
  // TODO: Refactor to selectors
  blockEditionMode: state.blocks.editionMode
})

export default connect(mapStateToProps)(EditMobilizationPage)
