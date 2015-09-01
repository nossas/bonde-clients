import React from 'react'
import * as Paths from '../Paths'
import { TabMenuItem, CloseButton } from '../components'

export default class MobilizationFonts extends React.Component {
  renderMenu() {
    const { mobilization, location } = this.props
    const fontsMobilizationPath = Paths.fontsMobilization(mobilization.id)

    return(
      <div className="bg-white px3 clearfix">
        <h2 className="mb3">Estilo da Página</h2>
        <div>
          <ul className="list-reset mb0">
            <TabMenuItem
              path={fontsMobilizationPath}
              text="Fontes"
              isActive={fontsMobilizationPath == location.pathname}
            />
          </ul>
        </div>
      </div>
    )
  }

  render() {
    return(
      <div className="flex-auto bg-silver gray relative">
        {this.renderMenu()}
        <div className="py3 px4">
          <p className="h5">
            Defina as fontes da páginaclose
          </p>
        </div>
        <CloseButton path={Paths.editMobilization(this.props.mobilization.id)} />
      </div>
    )
  }
}
