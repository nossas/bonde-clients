import React from 'react'
import PageBlockColumn from "./PageBlockColumn.jsx"
import { connect } from 'redux/react'

@connect(state => ({
  widgets: state.widgets
}))

export default class PageBlock extends React.Component {
  render(){
    const block = this.props.block
    const columns = this.props.widgets

    return(
      <div className="clearfix mb4">
        {
          columns.map(function(column){
            return(
              <PageBlockColumn
                {...this.props}
                key={block.uuid + columns.indexOf(column)}
                column={column} />
            )
          }.bind(this))
        }
      </div>
    )
  }
}
