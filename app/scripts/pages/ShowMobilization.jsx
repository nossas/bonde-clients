import React from 'react'
import classnames from 'classnames'
import Block from './../components/Block.jsx'
import * as BlockActions from './../actions/BlockActions'
import * as WidgetActions from './../actions/WidgetActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import ua from 'universal-analytics'

@connect(state => ({
  blocks: state.blocks,
  widgets: state.widgets
}))

export default class ShowMobilization extends React.Component {
  constructor(props, context){
    super(props, context)
    // ua(props.mobilization.google_analytics_code, {https: true}).pageview("/").send()
  }

  componentDidMount(){
    const { dispatch, mobilization } = this.props
    const bindedBlockActions = bindActionCreators(BlockActions, dispatch)
    const bindedWidgetActions = bindActionCreators(WidgetActions, dispatch)
    bindedBlockActions.fetchBlocks({mobilization_id: mobilization.id})
    bindedWidgetActions.fetchWidgets({mobilization_id: mobilization.id})
  }

  render(){
    const { mobilization, blocks } = this.props
    const { color_scheme, header_font, body_font } = mobilization
    const className = classnames('flex-auto', color_scheme, `${header_font}-header`, `${body_font}-body`)

    return (
      <div className={className}>
        {
          blocks.map(function(block, index){
            if(!block.hidden){
              return <Block {...this.props} key={"block-" + block.id} block={block} editable={false} />
            }
          }.bind(this))
        }
      </div>
    )
  }
}
