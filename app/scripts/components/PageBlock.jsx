import React from 'react'
import PageBlockColumn from "./PageBlockColumn.jsx"

export default class PageBlock extends React.Component {
  render(){
    var columns = this.props.block.columns

    return(
      <div className="clearfix mb4">
        {
          columns.map(function(column){
            return <PageBlockColumn column={column} />
          })
        }
      </div>
    )
  }
}
