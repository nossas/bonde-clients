import React from 'react'
import PageBlockColumn from "./PageBlockColumn.jsx"

export default class PageBlock extends React.Component {
  render(){
    const block = this.props.block
    const columns = block.columns

    return(
      <div className="clearfix mb4">
        {
          columns.map(function(column){
            return(
              <PageBlockColumn
                key={block.uuid + block.columns.indexOf(column)}
                column={column} />
            )
          })
        }
      </div>
    )
  }
}
