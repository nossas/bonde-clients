import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'

// Global module dependencies
import { Loading } from '~components/await'
import { GoogleFontsLoader } from '~components/fonts'
import * as arrayUtil from '~utils/array'
import * as paths from '~client/paths'

import Mobilization from '~client/mobrender/components/mobilization.connected'

export class MobilizationsEditPage extends Component {
  componentDidMount () {
    const { mobilization, blocksIsLoaded, blocks } = this.props
    if (blocksIsLoaded && blocks.length === 0) {
      browserHistory.push(paths.mobilizationTemplatesChoose(mobilization))
    }
  }

  render () {
    const {
      blocksIsLoaded,
      blocksIsLoading,
      widgetsIsLoaded,
      widgetsIsLoading,
      mobilization
    } = this.props
    const isLoaded = blocksIsLoaded && widgetsIsLoaded
    const isntLoading = !blocksIsLoading && !widgetsIsLoading

    if (isLoaded && isntLoading) {
      const fonts = [mobilization.header_font, mobilization.body_font].filter(arrayUtil.distinct)
      return (
        <div className='flex flex-auto overflow-hidden'>
          <Mobilization editable={true} />
          <GoogleFontsLoader fonts={fonts} />
        </div>
      )
    }
    return <Loading />
  }
}

MobilizationsEditPage.propTypes = {
  mobilization: PropTypes.shape({
    id: PropTypes.number.isRequired,
    header_font: PropTypes.string,
    body_font: PropTypes.string
  }).isRequired,
  blocks: PropTypes.array,
  blocksIsLoaded: PropTypes.bool,
  blocksIsLoading: PropTypes.bool.isRequired,
  widgets: PropTypes.array,
  widgetsIsLoading: PropTypes.bool.isRequired,
  widgetsIsLoaded: PropTypes.bool.isRequired
}

export default MobilizationsEditPage
