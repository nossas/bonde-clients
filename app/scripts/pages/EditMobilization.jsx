import React from 'react'
import classnames from 'classnames'
import Block from './../components/Block.jsx'
import { bindActionCreators } from 'redux'
import * as WidgetActions from './../actions/WidgetActions'
import * as BlockActions from './../actions/BlockActions'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'
import * as Paths from '../Paths'
import { connect } from 'react-redux'

@connect(state => ({
  blocks: state.blocks,
  widgets: state.widgets,
  scrolledToBottom: false,
  widgetsCount: state.widgets.length
}))
@reactMixin.decorate(Navigation)

export default class EditMobilization extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      scrolledToBottom: props.scrolledToBottom,
      widgetsCount: props.widgetsCount
    }
  }

  componentDidMount(){
    const { mobilization, dispatch, blocks } = this.props
    if (blocks.length == 0) {
      this.transitionTo(Paths.newMobilizationBlock(mobilization.id))
    }
    const bindedBlockActions = bindActionCreators(BlockActions, dispatch)
    const bindedWidgetActions = bindActionCreators(WidgetActions, dispatch)
    bindedBlockActions.fetchBlocks({mobilization_id: mobilization.id})
    bindedWidgetActions.fetchWidgets({mobilization_id: mobilization.id})
  }

  componentDidUpdate() {
    if (!this.state.scrolledToBottom &&
        this.props.location.query &&
        this.props.location.query.newBlock &&
        this.props.location.query.newBlock == "true" &&
        this.props.blocks.length > 0 &&
        this.props.widgets.length > 0 &&
        this.props.widgets.length > this.state.widgetsCount
        ) {
      window.scrollTo(0, document.body.scrollHeight)
      this.setState({scrolledToBottom: true})
    }
  }

  render(){
    const { mobilization, blocks } = this.props
    const className = classnames("flex-auto", mobilization.color_scheme, mobilization.font_set)
    return (
      <div className={className}>
        {
          blocks.map(function(block, index){
            return(
              <Block
                {...this.props}
                key={"block-" + block.id}
                block={block}
                canMoveUp={index != 0}
                canMoveDown={index != blocks.length - 1}
                editable={true}
              />
            )
          }.bind(this))
        }
      </div>
    )
  }
}
