import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Empty, Header, Navigation, Tab } from 'bonde-components'
import styled from 'styled-components'
import { useSession } from 'bonde-core-tools'
import { ResponsiveUI } from 'components'
import Mobilizers from './Mobilizers'

const SubHeader = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #000;
  padding: 0 60px;

  h3 {
    color: #fff;
    margin: 10px 0 30px;
  }
`

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const CommunityPage = ({ match, location }) => {
  const { community } = useSession()

  // RegexWith parameters number
  // \/community\/\d+\/mobilizers\/*
  const isActive = new RegExp(/\/community\/mobilizers\/*/).test(location.pathname)

  return community ? (
    <PageWrap>
      <SubHeader>
        <Header.h3>{community.name}</Header.h3>
        <Navigation>
          <Tab active={isActive}>Mobilizadores</Tab>
          <Tab
            onClick={() => {
              if (process.env.REACT_APP_DOMAIN_ADMIN) {
                window.location.href = new URL('/community/info', process.env.REACT_APP_DOMAIN_ADMIN).href
              }
            }}
          >
            Outras configurações
          </Tab>
        </Navigation>
      </SubHeader>
      <ResponsiveUI.Row>
        <ResponsiveUI.Col xs={12} sm={12}>
          <Switch>
            <Route exact path={`${match.path}/mobilizers`}>
              <Mobilizers community={community} />
            </Route>
            <Redirect from={`${match.path}/settings`} to={`${match.path}/mobilizers`} />
          </Switch>
        </ResponsiveUI.Col>
      </ResponsiveUI.Row>
    </PageWrap>
  ) : <Empty message='Nada por aqui...' />
}

CommunityPage.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default CommunityPage
