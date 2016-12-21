import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import keycode from 'keycode'

import { startEditingBlock, stopEditingBlock } from '../../../../scripts/reducers/mobilizationEditor'
import { Loading } from '../../../../scripts/components'
import { actions, utils, selectors } from '../../../mobilizations/blocks'
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

  componentWillUpdate(props, state) {
    const { editingBackground, editingWidget } = this.state
    const { dispatch } = this.props

    if (editingBackground && !state.editingBackground) dispatch(stopEditingBlock())
    else if (!editingBackground && state.editingBackground) dispatch(startEditingBlock())
    else if (editingWidget && !state.editingWidget) dispatch(stopEditingBlock())
    else if (!editingWidget && state.editingWidget) dispatch(startEditingBlock())
  }

  onChange(state) {
    this.setState({ ...this.state, ...state })
  }

  render() {
    const { widgets, block } = this.props

    return (
      <div
        id={`block-${block.id}`}
        style={{ ...utils.generateStyle(block) }}
        className={classnames('clearfix', utils.generateClassName(block))}
        onMouseOver={() => ::this.onChange({ hasMouseOver: true })}
        onMouseOut={() => ::this.onChange({ hasMouseOver: false })}
        onKeyUp={event => {
          if (keycode(event.keyCode) === 'esc') {
            ::this.onChange({ editingBackground: false })
          }
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
              widgets={selectors.getWidgets({ widgets, block })}
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
