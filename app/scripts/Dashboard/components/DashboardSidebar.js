import React, { Component } from 'react'

import {
  Sidenav,
  SidenavList,
  SidenavListItem
} from '../../../components/Navigation'
import { getMobilization } from '../../Mobilization/MobilizationSelectors'
import * as Paths from '../../Paths'


class DashboardSidebar extends Component {

  render() {

    const { auth, mobilization: { currentId } } = this.props

    return (
      <Sidenav user={auth.user}>
        {
          !currentId ? null : (
            <SidenavList className="bg-lighten-2">
              <SidenavListItem
                linkType="router"
                text="Editar mobilização"
                icon="pencil"
                href={Paths.editMobilization(currentId)}
              />
              <SidenavListItem
                linkType="router"
                text="Adicionar conteúdo"
                icon="plus"
                href={Paths.newMobilizationBlock(currentId)}
              />
              <SidenavListItem
                text="Ver em uma nova aba"
                icon="external-link"
                href={Paths.mobilization(getMobilization(this.props))}
                target="_blank"
              />
              <SidenavListItem
                linkType="router"
                text="Configurações"
                icon="cog"
                href={Paths.basicsMobilization(currentId)}
              />
              {/*<SidenavListItem
                text="Lançar mobilização"
                icon="flag"
              />*/}
            </SidenavList>
          )
        }
        <SidenavList style={{ position: 'absolute', bottom: '0' }}>
          <SidenavListItem
            text="Minha Conta"
            icon="user"
          >
            <div className="white h6">{auth.user.email}</div>
          </SidenavListItem>
          <SidenavListItem
            text="Sair"
            className="caps"
            href={Paths.logout()}
          />
        </SidenavList>
      </Sidenav>
    )
  }
}

export default DashboardSidebar
