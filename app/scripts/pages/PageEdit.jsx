import React from 'react'
import Block from './../components/Block.jsx'
import { bindActionCreators } from 'redux'
import * as WidgetActions from './../actions/WidgetActions'
import { connect } from 'redux/react'

@connect(state => ({
  blocks: state.blocks
}))

export default class PageEdit extends React.Component {
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
