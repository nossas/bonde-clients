import React from 'react'
import { Link } from 'react-router'
import { MobilizationCard } from './../components'
import * as Paths from '../Paths'

export default class ListMobilizations extends React.Component {
  render(){
    return(
      <div className="flex-auto bg-silver gray">
        <h2 className="bg-white mt0 py3 px4">
          <i className="fa fa-flag-o mr2 aqua" />
          Suas mobilizações
          <Link
            to={Paths.newMobilization()}
            className="button bg-aqua caps h4 right">
            <i className="fa fa-plus mr2" />
            Nova mobilização
          </Link>
        </h2>
        <div className="py3 px4">
          {
            this.props.mobilizations.map(function(mobilization, index){
              return <MobilizationCard {...this.props} key={"mobilization-" + mobilization.id} mobilization={mobilization} />
            }.bind(this))
          }
        </div>
      </div>
    )
  }
}
