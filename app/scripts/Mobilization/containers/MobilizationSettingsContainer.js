import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { ConfigurationsMenu } from '../../components'
import { getMobilization } from '../MobilizationSelectors'

export class MobilizationSettingsContainer extends Component {
  render() {
    const { children, ...otherProps } = this.props

    return (
      <div className="flex-auto flex flex-column bg-silver gray relative">
        <ConfigurationsMenu {...this.props} />
        <div className='flex-auto' style={{ overflowY: 'scroll' }}>
          {
            React.cloneElement(children, {...otherProps})
          }
        </div>
      </div>
    )
  }
}

MobilizationSettingsContainer.propTypes = {
  saving: PropTypes.bool.isRequired,
  mobilization: PropTypes.object.isRequired
}

const mapStateToProps = (globalState, ownProps) => ({
  saving: globalState.mobilization.saving,
  mobilization: getMobilization(globalState, ownProps)
})

export default connect(mapStateToProps)(MobilizationSettingsContainer)
