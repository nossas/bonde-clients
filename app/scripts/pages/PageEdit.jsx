import React from 'react'
import Block from './../components/Block.jsx'
import { bindActionCreators } from 'redux'
import * as WidgetActions from './../actions/WidgetActions'
import * as BlockActions from './../actions/BlockActions'
import { connect } from 'redux/react'

@connect(state => ({
  blocks: state.blocks
}))

export default class PageEdit extends React.Component {
  componentDidMount(){
    const { mobilization, dispatch } = this.props
    const bindedBlockActions = bindActionCreators(BlockActions, dispatch)
    bindedBlockActions.fetchBlocks({mobilization_id: mobilization.id})
  }

  render(){
    const { mobilization, dispatch } = this.props
    const actions = bindActionCreators(WidgetActions, dispatch)

    return (
      <div className="flex-auto p2">
        {
          this.props.blocks.map(function(block){
            return <Block {...this.props} actions={actions} key={block.uuid} block={block} />
          }.bind(this))
        }
      </div>
    )
  }
}
