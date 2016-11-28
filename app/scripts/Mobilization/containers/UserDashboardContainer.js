import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchMobilizations, mobilizationsIsLoaded } from '../MobilizationActions'
// TODO: Refactor actions to module
import { fetchOrganizations, isOrganizationsLoaded } from '../../reducers/organizations'
import * as Paths from '../../Paths'
import {
  Sidenav,
  SidenavList,
  SidenavListItem
} from '../../../components/Navigation'
import { getMobilization } from '../MobilizationSelectors'
import logoIcon from '../../../components/Navigation/Sidenav/logo-icon-letters.svg'

class UserDashboard extends Component {

  static fetchData({ dispatch, getState }) {
    const promises = []

    // TODO: When filter mobilization by user owner, make code here
    if (!mobilizationsIsLoaded(getState())) {
      promises.push(dispatch(fetchMobilizations()))
    }

    if (!isOrganizationsLoaded(getState())) {
      promises.push(dispatch(fetchOrganizations()))
    }

    return Promise.all(promises)
  }

  componentDidMount() {
    // TODO this callback is a workaround to load mobilizations in client-side
    // but it should be replaced by the static fetchData method that is fetching
    // mobilizations only in the server-side for now
    const { organizations, mobilization, dispatch } = this.props

    if (!organizations.loaded) {
      dispatch(fetchOrganizations())
    }

    if (!mobilization.loaded) {
      dispatch(fetchMobilizations())
    }
  }

  render() {
    const { children, ...otherProps } = this.props
    const {
      mobilization: { currentId },
      auth: { user }
    } = otherProps

    return (
      <div className="top-0 right-0 bottom-0 left-0 flex flex-column absolute">
        <Sidenav user={otherProps.auth.user}>
          {
            !currentId ? null : (
              <SidenavList style={{ backgroundColor: 'rgba(255,255,255,.18)' }}>
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
                  href={Paths.mobilization(getMobilization(otherProps))}
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
          <SidenavList style={{ position: 'absolute', bottom: '0', paddingBottom: 0 }}>
            <SidenavListItem
              text="Minha Conta"
              icon="user-circle-o"
            />
            <SidenavListItem
              linkType="router"
              text="Sair"
              icon="arrow-left"
              href={Paths.logout()}
            />
            <SidenavListItem
              style={{
                borderTop: '1px solid rgba(255,255,255,.2)',
                paddingTop: '1rem',
                paddingBottom: '1rem',
                marginTop: '.5rem',
              }}
              customContent={(
                <div style={{ width: '180px', fontSize: '.75rem', color: 'rgba(255,255,255,.5)' }}>
                  {/*<div className="col col-5">Sobre Nós</div>*/}
                  <div className="col col-4">
                    <a href="https://nossas.zendesk.com/" target="_blank" className="has-hover">
                      Suporte
                    </a>
                  </div>
                  {/*<div className="col col-3">Doe</div>*/}
                </div>
              )}
              customIcon={(
                <img
                  src={logoIcon}
                  style={{ width: '39px', display: 'table-cell', margin: 'auto' }}
                />
              )}
            />
          </SidenavList>
        </Sidenav>
        {
          React.cloneElement(children, {...otherProps})
        }
      </div>
    )
  }
}

UserDashboard.propTypes = {
  auth: PropTypes.object.isRequired,  // RequireLogin.js
  organizations: PropTypes.object.isRequired,
  mobilization: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.element
}

const mapStateToProps = (globalState, ownProps) => {
  return {
    organizations: globalState.organizations,
    mobilization: globalState.mobilization
  }
}

export default connect(mapStateToProps)(UserDashboard)
