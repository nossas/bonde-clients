import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { ConfigurationsMenu } from './../components'

import * as Selectors from '../Mobilization/MobilizationSelectors'


export class MobilizationSettings extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    mobilization: PropTypes.object.isRequired
  }

  render() {
    const { children, ...otherProps } = this.props

    return (
      <div className="flex-auto flex flex-column bg-silver gray relative">
        <ConfigurationsMenu {...this.props} />
        <div className='flex-auto' style={{overflowY: 'scroll'}}>
          { React.cloneElement(children, {...otherProps}) }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (globalState, ownProps) => {
  return {
    mobilization: Selectors.getMobilization(globalState, ownProps)
  }
}

export default connect(mapStateToProps)(MobilizationSettings)
