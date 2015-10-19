import React, { PropTypes } from 'react'
import { ConfigurationsMenu } from './../components'

export default class MobilizationSettings extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired
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
