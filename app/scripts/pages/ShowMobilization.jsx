import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Block from './../components/Block.jsx'
// import ua from 'universal-analytics'

export default class ShowMobilization extends React.Component {
  static propTypes = {
    mobilization: PropTypes.object.isRequired,
    blocks: PropTypes.object.isRequired,
    widgets: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context)
    // ua(props.mobilization.google_analytics_code, {https: true}).pageview("/").send()
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
