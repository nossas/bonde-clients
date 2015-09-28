import React, { PropTypes } from 'react'
import classnames from 'classnames'
import {Block, Navbar} from './../components'
import DocumentMeta from 'react-document-meta'
import trackPageView from './../../../src/trackPageView'
import { mobTracker } from './../../../src/analytics'

export default class ShowMobilization extends React.Component {
  static propTypes = {
    mobilization: PropTypes.object.isRequired,
    blocks: PropTypes.object.isRequired,
    widgets: PropTypes.object.isRequired
  }

  componentDidMount() {
    trackPageView('/', 'mobTracker')
  }

  render() {
    const { mobilization, blocks } = this.props
    const {
      color_scheme: colorScheme,
      header_font: headerFont,
      body_font: bodyFont,
      google_analytics_code: mobTrackingId
    } = mobilization
    const className = classnames('flex-auto', colorScheme, `${headerFont}-header`, `${bodyFont}-body`)

    const metaData = {
      title: mobilization.name,
      description: mobilization.goal,
      meta: {
        name: {
          'viewport': 'width=device-width, initial-scale=1',
          'og:title': mobilization.facebook_share_title,
          'og:description': mobilization.facebook_share_description,
          'og:image': mobilization.facebook_share_image
        }
      }
    }

    return (
      <div className={className}>
        <DocumentMeta {...metaData} />
        <Navbar blocks={blocks} />
        {
          blocks.data.map(function(block) {
            if (!block.hidden) {
              return <Block {...this.props} key={'block-' + block.id} block={block} editable={false} />
            }
          }.bind(this))
        }
        { mobTrackingId &&
          <script dangerouslySetInnerHTML={{__html: mobTracker.replace('{mobTrackingId}', mobTrackingId)}} /> }
      </div>
    )
  }
}
