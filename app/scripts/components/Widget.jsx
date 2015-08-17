import React from 'react'
import { DraftWidget, ContentWidget, FormWidget } from './'
import classNames from 'classnames'

export default class Widget extends React.Component {
  renderWidget() {
    const { widget } = this.props
    switch (widget.kind) {
      case 'draft':
        return (
          <DraftWidget {...this.props} />
        )
      case 'content':
        return (
          <ContentWidget {...this.props} />
        )
      case 'form':
        return (
          <FormWidget {...this.props} />
        )
    }
  }

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
        { this.renderWidget() }
      </div>
    )
  }
}
