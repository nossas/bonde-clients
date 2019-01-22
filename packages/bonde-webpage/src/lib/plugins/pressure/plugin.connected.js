import React from 'react'
import { connect } from 'react-redux'
import { fillWidget } from './redux/action-creators'
import PressureGraphQL from './plugin.graphql'

class PressureProvider extends React.Component {
  constructor (props) {
    super(props)
    this.state = { saving: false, filledPressureWidgets: [] }
  }

  handleFillWidget (params) {
    this.setState({ saving: true })
    return this.props.fillWidget(params)
      .then(({ widget }) => {
        const { filledPressureWidgets } = this.state
        this.setState({
          saving: true,
          filledPressureWidgets: [...filledPressureWidgets, widget.id]
        })
        return Promise.resolve()
      })
  }

  render () {
    const { saving, filledPressureWidgets } = this.state
    return (
      <PressureGraphQL
        {...this.props}
        asyncFillWidget={this.handleFillWidget.bind(this)}
        saving={saving}
        filledPressureWidgets={filledPressureWidgets}
      />
    )
  }
}

const mapDispatchToProps = { fillWidget }

export default connect(undefined, mapDispatchToProps)(PressureProvider)
