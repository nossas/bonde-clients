import React from 'react'
import PageBlockColumn from "./PageBlockColumn.jsx"
import { connect } from 'redux/react'

@connect(state => ({
  widgets: state.widgets
}))

export default class PageBlock extends React.Component {
  render(){
    const { widgets } = this.props

    return(
      <div className="clearfix mb4">
        {
          widgets.map(function(widget){
            return(
              <PageBlockColumn
                {...this.props}
                key={"widget-" + widget.id}
                widget={widget} />
            )
          }.bind(this))
        }
      </div>
    )
  }
}
