import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { Block, Loading } from './../components'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'
import * as Paths from '../Paths'
import { connect } from 'react-redux'
import { fetchWidgets } from './../reducers/widgets'

@connect(state => ({
  scrolledToBottom: false,
  widgetsCount: state.widgets.length
}))
@reactMixin.decorate(Navigation)

export default class EditMobilization extends React.Component {
  static propTypes = {
    mobilization: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    blocks: PropTypes.object.isRequired,
    widgets: PropTypes.object.isRequired,
    location: PropTypes.object
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      scrolledToBottom: props.scrolledToBottom,
      widgetsCount: props.widgetsCount
    }
  }

  componentDidMount() {
    const {dispatch, mobilization} = this.props
    dispatch(fetchWidgets({mobilization_id: mobilization.id}))
  }

  componentDidUpdate() {
    const { mobilization, blocks, widgets } = this.props
    if (!this.newBlock() && blocks.data.length === 0 && blocks.loaded === true) {
      this.transitionTo(Paths.newMobilizationBlock(mobilization.id))
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
    const {location} = this.props
    return location.query && location.query.newBlock && location.query.newBlock === 'true'
  }

  renderBlocks() {
    const { mobilization, blocks } = this.props
    const { color_scheme } = mobilization
    const className = classnames('flex-auto', color_scheme)

    return (
      <div className={className}>
        {
          blocks.data.map(function(block, index) {
            return (
              <Block
                {...this.props}
                key={'block-' + block.id}
                block={block}
                canMoveUp={index !== 0}
                canMoveDown={index !== blocks.length - 1}
                editable
              />
            )
          }.bind(this))
        }
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
