import React, { Component, PropTypes } from 'react'

// Current module depepdencies
import { ContentOldEditor, ContentNewEditor } from '../components'

class Content extends Component {
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

Content.propTypes = {
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  editable: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

export default Content
