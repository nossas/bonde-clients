import React from 'react'
import { Link } from 'react-router'
import * as Paths from '../Paths'
import { MobilizationBasicsForm } from './../components'
import { ConfigurationsMenu } from './../components'

export default class MobilizationBasics extends React.Component {
  render(){
    const { mobilization } = this.props
    return(
      <div className="flex-auto bg-silver gray relative">
        <ConfigurationsMenu {...this.props} />
        <div className="py3 px4">
          <MobilizationBasicsForm {...this.props} />
        </div>
      </div>
    )
  }
}
