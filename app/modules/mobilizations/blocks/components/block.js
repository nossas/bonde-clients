import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { startEditingBlock, stopEditingBlock } from '../../../../scripts/reducers/mobilizationEditor'
import { Loading } from '../../../../scripts/components'
import { actions } from '../../../mobilizations/blocks'
import {
  BlockColorPicker,
  BlockWidgets,
  BlockHiddenTag,
  BlockDropdownMenu,
} from '../../../mobilizations/blocks/components'

export class Block extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      hasMouseOver: false,
      editingBackground: false,
      editingWidget: false,
      bgClass: props.block.bg_class,
      bgImage: props.block.bg_image,
      uploadProgress: null,
      loading: false
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.editingBackground && !nextState.editingBackground) {
      this.props.dispatch(stopEditingBlock())
    } else if (!this.state.editingBackground && nextState.editingBackground) {
      this.props.dispatch(startEditingBlock())
    } else if (this.state.editingWidget && !nextState.editingWidget) {
      this.props.dispatch(stopEditingBlock())
    } else if (!this.state.editingWidget && nextState.editingWidget) {
      this.props.dispatch(startEditingBlock())
    }
  }

  componentWillReceiveProps() {
    if (this.state.loading) {
      this.setState({loading: false})
    }
  }

  filterWidgets(widgets, block) {
    return widgets.filter(function(widget) {
      return widget.block_id === block.id
    })
  }

  handleKeyUp(event) {
    if (event.keyCode === 27) {
      this.setState({editingBackground: false})
    }
  }

  handleMouseOver() {
    this.setState({ hasMouseOver: true })
  }

  handleMouseOut() {
    this.setState({ hasMouseOver: false })
  }

  onChange(state) {
    this.setState({ ...this.state, ...state })
  }

  render() {
    // TODO: change widgets constant name to reflex the object that is returned
    // by the reducer
    const { widgets, block } = this.props
    const {
      bg_class: bgClass,
      bg_image: bgImage
    } = block
    const isBackgroundClass = /^bg\-\d+/.test(bgClass)
    const isBackgroundObject = !isBackgroundClass && /^{.*}$/.test(bgClass)
    const bg = isBackgroundObject ? JSON.parse(bgClass) : null

    const filteredWidgets = this.filterWidgets(widgets.data, block)
    return (
      <div
        id={`block-${block.id}`}
        className={classnames(
          'clearfix',
          isBackgroundClass ? bgClass : null,
          bgImage ? 'bg-cover' : null
        )}
        onKeyUp={::this.handleKeyUp}
        onMouseOver={::this.handleMouseOver}
        onMouseOut={::this.handleMouseOut}
        style={{
          backgroundImage: bgImage ? `url(${bgImage})` : null,
          backgroundColor: isBackgroundObject ? `rgba(${bg.r},${bg.g},${bg.b},${bg.a})` : null
        }}
      >
        <div className="col-10 mx-auto">
          {this.state.editingBackground && (
            <BlockColorPicker
              state={this.state}
              props={this.props}
              onChange={::this.onChange}
            />
          )}
          <div className="clearfix" style={{ padding: '5em 0' }}>
            <BlockWidgets
              state={this.state}
              props={this.props}
              onChange={::this.onChange}
              widgets={filteredWidgets}
            />
          </div>
          <div className="relative">
            {this.props.block.hidden && (
              <BlockHiddenTag />
            )}
          </div>
          {this.state.loading && <Loading />}

          <div className="relative">
            <BlockDropdownMenu
              state={this.state}
              props={this.props}
              onChange={::this.onChange}
            />
          </div>
        </div>
      </div>
    )
  }
}

Block.propTypes = {
  block: PropTypes.object.isRequired,
  mobilization: PropTypes.object.isRequired,
  blocks: PropTypes.object.isRequired,
  editable: PropTypes.bool.isRequired,
  widgets: PropTypes.object.isRequired,
  auth: PropTypes.object,
  canMoveUp: PropTypes.bool,
  canMoveDown: PropTypes.bool,
  dispatch: PropTypes.func
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, actions)(Block)
