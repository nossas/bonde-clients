import React from 'react'
import classnames from 'classnames'

export default class Color extends React.Component {
  render(){
    const { bgClass, selectedClass, onClick } = this.props
    return(
      <div className="col col-1 p1">
        <div className={classnames("col", "col-12", "border", "rounded", "button", "bg-white", bgClass)} style={bgClass == selectedClass ? {boxShadow: '1px 1px 3px black'} : null } onClick={onClick} data-bg-class={bgClass}><br/></div>
      </div>
    )
  }
}
