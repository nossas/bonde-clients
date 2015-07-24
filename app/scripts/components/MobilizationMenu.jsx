import React from 'react'
import { Link } from 'react-router'
import * as Paths from '../Paths'

export default class MobilizationMenu extends React.Component {
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
          <Link to={Paths.editMobilization(mobilization.id)} className="white">{mobilization.name}</Link>
          <h4 className="silver caps muted">Construção da página</h4>
          <Link to={Paths.newMobilizationBlock(mobilization.id)} className="silver caps">+ Conteúdo</Link>
        </div>
      </div>
    )
  }
}
