import React from 'react'
import PageBlock from './../components/PageBlock.jsx'

var PageEdit = React.createClass({
  render: function(){
    var page = this.props.mobilization.pages[0]
    var blocks = page.blocks

    return (
      <div className="flex-auto p2">
        {
          blocks.map(function(block){
            return <PageBlock key={block.uuid} block={block} />
          })
        }
      </div>
    )
  }
})

module.exports = PageEdit
