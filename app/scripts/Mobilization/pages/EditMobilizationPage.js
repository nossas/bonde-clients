import React, { Component, PropTypes } from 'react'
import { Navigation } from 'react-router'
import reactMixin from 'react-mixin'
import { connect } from 'react-redux'
import classnames from 'classnames'

import * as Paths from '../../Paths'
import { Loading, Navbar } from '../../components'
import { fetchWidgets } from '../../Widget/reducer'
import * as MobilizationActions from '../MobilizationActions'
import Block from '../../../modules/mobilizations/blocks/components'

@reactMixin.decorate(Navigation)
class EditMobilizationPage extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      scrolledToBottom: props.scrolledToBottom,
      widgetsCount: props.widgetsCount
    }
  }

  componentDidMount() {
    // TODO: Melhorar a chamada desse metódo
    // responsável por recarregar os widgets, trocar action
    // por reducer
    const {
      mobilization: { id },
      params: { mobilization_id: mobilizationId },
      dispatch,
      setCurrentMobilizationId,
    } = this.props
    dispatch(fetchWidgets({mobilization_id: id}))
    dispatch(setCurrentMobilizationId(mobilizationId))
  }

  componentDidUpdate() {
    const { mobilization, blocks, widgets } = this.props
    if (blocks.data.length === 0 && blocks.loaded === true) {
      this.transitionTo(Paths.createBlock(mobilization))
    }
    if (!this.state.scrolledToBottom &&
        this.newBlock() &&
        blocks.data.length > 0 &&
        widgets.data.length > 0 &&
        widgets.data.length > this.state.widgetsCount
        ) {
      window.scrollTo(0, document.body.scrollHeight)
      this.setState({scrolledToBottom: true})
    }
  }

  newBlock() {
    const { location } = this.props
    return location.query && location.query.newBlock && location.query.newBlock === 'true'
  }

  renderBlocks() {
    const { mobilization, blocks, blockEditionMode } = this.props
    const { color_scheme: colorScheme } = mobilization

    return (
      <div className={classnames(colorScheme, 'flex flex-column flex-auto relative')}>
        {!blockEditionMode && (
          <Navbar {...this.props} editable />
        )}
        <div id='blocks-list' className='flex-auto' style={{overflowY: 'scroll'}}>
          {
            blocks.data.map(function(block, index) {
              return (
                <Block
                  {...this.props}
                  key={`block-${block.id}`}
                  block={block}
                  canMoveUp={index !== 0}
                  canMoveDown={index !== blocks.length - 1}
                  editable
                />
              )
            }.bind(this))
          }
        </div>
      </div>
    )
  }

  renderLoader() {
    return <Loading />
  }

  render() {
    return this.props.blocks.loaded === true
      ? this.renderBlocks()
      : this.renderLoader()
  }
}

EditMobilizationPage.propTypes = {
  // mapped by MobilizationDashboardContainer
  mobilization: PropTypes.object,
  blocks: PropTypes.object,
  widgets: PropTypes.object,
  params: PropTypes.object.isRequired,
  scrolledToBottom: PropTypes.bool.isRequired,
  widgetsCount: PropTypes.number,
  blockEditionMode: PropTypes.bool,
  // actions
  setCurrentMobilizationId: PropTypes.func
}

EditMobilizationPage.defaultProps = {
  scrolledToBottom: false
}

const mapStateToProps = state => ({
  widgetsCount: state.widgets.length,
  blockEditionMode: state.blocks.editionMode,
})

export default connect(mapStateToProps, MobilizationActions)(EditMobilizationPage)
