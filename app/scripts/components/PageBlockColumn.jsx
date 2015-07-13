import React from 'react'
import PageBlockColumnContent from "./PageBlockColumnContent.jsx"

export default class PageBlockColumn extends React.Component {
  render(){
    var className = "border p2 col col-" + this.props.widget.size

    return(
      <div className={className}>
        <PageBlockColumnContent
          {...this.props} />
      </div>
    )
  }
}
