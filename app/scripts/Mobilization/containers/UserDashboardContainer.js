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
          <SidenavList style={{ position: 'absolute', bottom: '0' }}>
            <SidenavListItem
              text="Minha Conta"
              icon="user"
            >
              <div className="white h6">{user.email}</div>
            </SidenavListItem>
            <SidenavListItem
              text="Sair"
              className="caps"
              href={Paths.logout()}
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
