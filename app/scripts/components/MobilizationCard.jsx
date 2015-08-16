import React from 'react'
import { Link } from 'react-router'
import * as Paths from '../Paths'

export default class MobilizationCard extends React.Component {
  render() {
    const { mobilization } = this.props
    return(
      <div className="bg-white p2 border mb2">
        <Link to={Paths.editMobilization(mobilization.id)} className="h3 bold gray">
          { mobilization.name }
        </Link>
        <p>{ mobilization.goal }</p>
      </div>
    )
  }
}
