import React from 'react'
import PageBlock from './../components/PageBlock.jsx'
import { bindActionCreators } from 'redux'
import * as MobilizationActions from './../actions/MobilizationActions'

var PageEdit = React.createClass({
  render: function(){
    const page = this.props.mobilization.pages[0]
    const { blocks } = page
    const { dispatch } = this.props
    const actions = bindActionCreators(MobilizationActions, dispatch)

    return (
      <div className="flex-auto p2">
        {
          blocks.map(function(block){
            return <PageBlock {...this.props} actions={actions} key={block.uuid} block={block} />
          }.bind(this))
        }
      </div>
    )
  }
})

module.exports = PageEdit
