import React, { Component, PropTypes } from 'react'

import {
  ContentOldEditor,
  ContentNewEditor
} from '../../../../modules/widgets/__plugins__/content/components'

class ContentWidget extends Component {

  constructor (props) {
    super(props)
    this.state = { forceRenderNewEditor: false }
  }

  handleForceRender () {
    this.setState({ forceRenderNewEditor: true })
  }

  render () {
    const { widget: { settings } } = this.props

    try {
      // If parse content is RebooEditor
      JSON.parse(settings.content)
      return <ContentNewEditor {...this.props} />
    } catch (e) {
      // Else is old editor
      if (this.state.forceRenderNewEditor) {
        return <ContentNewEditor {...this.props} />
      } else {
        return (
          <ContentOldEditor
            handleForceRender={this.handleForceRender.bind(this)}
            {...this.props}
          />
        )
      }
    }
  }
}

ContentWidget.propTypes = {
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  editable: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

export default ContentWidget
