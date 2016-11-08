import React, { Component, PropTypes } from 'react'

import NewEditorContentWidget from './NewEditorContentWidget'
import OldEditorContentWidget from './OldEditorContentWidget'


export default class ContentWidget extends Component {

  render() {
    const { widget: { settings } } = this.props
    try {
      // If parse content is RebooEditor
      JSON.parse(settings.content)
      return <NewEditorContentWidget {...this.props} />
    } catch (e) {
      // Else is old editor
      return <OldEditorContentWidget {...this.props} />
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
