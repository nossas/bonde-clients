import React, { PropTypes } from 'react'
import { DraftWidget, ContentWidget, FormWidget } from './'
import classnames from 'classnames'

export default class Widget extends React.Component {
  static propTypes = {
    widget: PropTypes.object.isRequired
  }

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
      default:
        return (
          <DraftWidget {...this.props} />
        )
    }
  }

  render() {
    const className = classnames(
      'px2', 'col', 'mb4', 'md-mb0',
      'col-' + this.props.widget.sm_size,
      'sm-col-' + this.props.widget.sm_size,
      'md-col-' + this.props.widget.md_size,
      'lg-col-' + this.props.widget.lg_size
    )

    return (
      <div className={className}>{this.renderWidget()}</div>
    )
  }
}
