import React from 'react'
import ContentWidget from "./ContentWidget.jsx"
import classNames from 'classnames'

export default class Widget extends React.Component {
  render(){
    const className = classNames(
      'px2', 'col',
      'col-' + this.props.widget.sm_size,
      'sm-col-' + this.props.widget.sm_size,
      'md-col-' + this.props.widget.md_size,
      'lg-col-' + this.props.widget.lg_size
    )

    return(
      <div className={className}>
        <ContentWidget {...this.props} />
      </div>
    )
  }
}
