import React, { PropTypes } from 'react'
import classnames from 'classnames'
import DocumentMeta from 'react-document-meta'
import { connect } from 'react-redux'
import { fetchMobilizations, isMobilizationsLoaded } from './../reducers/mobilizations'
import { fetchBlocks, isBlocksLoaded } from './../reducers/blocks'
import { fetchWidgets, isWidgetsLoaded } from './../reducers/widgets'
import { Block, Navbar } from './../components'
import trackPageView from './../../../src/trackPageView'
import { mobTracker } from './../../../src/analytics'

const mapStateToProps = (state) => {
  return ({
    mobilizations: state.mobilizations,
    blocks: state.blocks,
    widgets: state.widgets
  })
}

export class ShowMobilization extends React.Component {
  static propTypes = {
    mobilizations: PropTypes.object.isRequired,
    blocks: PropTypes.object.isRequired,
    widgets: PropTypes.object.isRequired,
    params: PropTypes.object
  }

  static fetchData(store, params) {
    const promises = []

    if (!isMobilizationsLoaded(store.getState())) {
      const action = fetchMobilizations({ids: [params.mobilization_id]})
      const dispatch = store.dispatch(action)
      promises.push(dispatch)
    }

    if (!isBlocksLoaded(store.getState())) {
      const action = fetchBlocks({mobilization_id: params.mobilization_id})
      const promise = store.dispatch(action)
      promises.push(promise)
    }

    if (!isWidgetsLoaded(store.getState())) {
      const action = fetchWidgets({mobilization_id: params.mobilization_id})
      const promise = store.dispatch(action)
      promises.push(promise)
    }

    return Promise.all(promises)
  }

  componentDidMount() {
    trackPageView('/', 'mobTracker')
  }

  metaData(mobilization) {
    return {
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
  }

  render() {
    const { mobilizations, params } = this.props

    const mobilization = mobilizations.data.filter(
      (m) => {return m.id === parseInt(params.mobilization_id, 10)}
    )[0]

    const { blocks, widgets } = this.props

    const {
      color_scheme: colorScheme,
      header_font: headerFont,
      body_font: bodyFont,
      google_analytics_code: mobTrackingId
    } = mobilization

    const pageClasses = classnames(
      colorScheme,
      `${headerFont}-header`,
      `${bodyFont}-body`,
      'absolute',
      'flex',
      'flex-column'
    )

    return (
      <div className={pageClasses} style={{top: 0, bottom: 0, left: 0, right: 0}}>
        <Navbar blocks={blocks} mobilization={mobilization} />
        <div id='blocks-list' className='flex-auto' style={{overflowY: 'scroll'}}>
          {
            blocks.data.map((block) => {
              if (!block.hidden) {
                return (
                  <Block
                    key={'block-' + block.id}
                    block={block}
                    editable={false}
                    mobilization={mobilization}
                    widgets={widgets}
                  />
                )
              }
            })
          }
        </div>
        <DocumentMeta {...this.metaData(mobilization)} />
        { mobTrackingId &&
          <script dangerouslySetInnerHTML={{__html: mobTracker.replace('{mobTrackingId}', mobTrackingId)}} /> }
      </div>
    )
  }
}

export default connect(mapStateToProps)(ShowMobilization)
