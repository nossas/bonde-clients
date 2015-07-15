import React from 'react'
import classnames from 'classnames'
import Block from './../components/Block.jsx'
import { bindActionCreators } from 'redux'
import * as WidgetActions from './../actions/WidgetActions'
import * as BlockActions from './../actions/BlockActions'
import { connect } from 'redux/react'

@connect(state => ({
  blocks: state.blocks,
  widgets: state.widgets
}))

export default class PageEdit extends React.Component {
  componentDidMount(){
    const { mobilization, dispatch } = this.props
    const bindedBlockActions = bindActionCreators(BlockActions, dispatch)
    const bindedWidgetActions = bindActionCreators(WidgetActions, dispatch)
    bindedBlockActions.fetchBlocks({mobilization_id: mobilization.id})
    bindedWidgetActions.fetchWidgets({mobilization_id: mobilization.id})
  }

  render(){
    const { mobilization } = this.props
    const className = classnames("flex-auto", mobilization.color_scheme, mobilization.font_set)
    return (
      <div className={className}>
        {
          this.props.blocks.map(function(block){
            return <Block {...this.props} key={"block-" + block.id} block={block} />
          }.bind(this))
        }
      </div>
    )
  }
}
