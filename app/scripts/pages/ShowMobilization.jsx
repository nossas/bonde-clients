import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Block from './../components/Block.jsx'
import * as WidgetActions from './../actions/WidgetActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import ua from 'universal-analytics'

@connect(state => ({
  widgets: state.widgets
}))

export default class ShowMobilization extends React.Component {
  static propTypes = {
    mobilization: PropTypes.object.isRequired,
    blocks: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context)
    // ua(props.mobilization.google_analytics_code, {https: true}).pageview("/").send()
  }

  componentDidMount() {
    const { dispatch, mobilization } = this.props
    const bindedWidgetActions = bindActionCreators(WidgetActions, dispatch)
    bindedWidgetActions.fetchWidgets({mobilization_id: mobilization.id})
  }

  render() {
    const { mobilization, blocks } = this.props
    const { color_scheme: colorScheme, header_font: headerFont, body_font: bodyFont } = mobilization
    const className = classnames('flex-auto', colorScheme, `${headerFont}-header`, `${bodyFont}-body`)

    return (
      <div className={className}>
        {
          blocks.data.map(function(block) {
            if (!block.hidden) {
              return <Block {...this.props} key={'block-' + block.id} block={block} editable={false} />
            }
          }.bind(this))
        }
      </div>
    )
  }
}
