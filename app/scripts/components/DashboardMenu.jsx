import React from 'react'
import { Link } from 'react-router'
import * as MobilizationsPaths from '../paths/MobilizationsPaths'
import * as MobilizationBlocksPaths from '../paths/MobilizationBlocksPaths'

export default class DashboardMenu extends React.Component {
  render(){
    const { user, mobilization } = this.props
    const style = { minWidth: "300px" }
    return(
      <div style={style} className="bg-gray p2 white">
        <div>
          {user.first_name} {user.last_name}
        </div>
        <div>
          <h4 className="silver caps muted">Mobilização</h4>
          <Link to={MobilizationsPaths.editMobilizationPath(mobilization.id)} className="white">{mobilization.name}</Link>
          <h4 className="silver caps muted">Construção da página</h4>
          <Link to={MobilizationBlocksPaths.newMobilizationBlockPath(mobilization.id)} className="silver caps">+ Conteúdo</Link>
        </div>
      </div>
    )
  }
}
