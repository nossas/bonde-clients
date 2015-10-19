import React from 'react'
import { MobilizationBasicsForm } from './../components'

export default class MobilizationBasics extends React.Component {
  render() {
    return (
      <div className="py3 px4">
        <MobilizationBasicsForm {...this.props} />
      </div>
    )
  }
}
