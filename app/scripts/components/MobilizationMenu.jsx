import React from 'react'
import { Link } from 'react-router'
import * as Paths from '../Paths'

export default class MobilizationMenu extends React.Component {
  render(){
    const { user, mobilization } = this.props
    const style = { minWidth: "300px" }
    return(
      <div style={style} className="bg-gray p2 white">
        <div className="flex flex-center mb3">
          <div className="flex-auto">
            <Link
              to={Paths.editMobilization(mobilization.id)}
              className="silver h5 bold">
              {mobilization.name}
            </Link>
          </div>
          <Link
            to={Paths.configMobilization(mobilization.id)} 
            className="silver h3">
            <i className="fa fa-cog" />
          </Link>
        </div>

        <h6 className="silver caps muted">Edição da página</h6>
        <Link
          to={Paths.newMobilizationBlock(mobilization.id)}
          className="silver button button-transparent full-width">
          <i className="fa fa-plus mr2" />
          Módulo de conteúdo
        </Link>
      </div>
    )
  }
}
