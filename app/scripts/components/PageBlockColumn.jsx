import React from 'react'
import PageBlockColumnContent from "./PageBlockColumnContent.jsx"

export default class PageBlockColumn extends React.Component {
  render(){
    var column = this.props.column
    var className = "border p2 center col col-" + column.size

    return(
      <div className={className}>
        <PageBlockColumnContent column={column} />
      </div>
    )
  }
}
