import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { Header, Navigation, Tab } from 'bonde-components'
import styled from 'styled-components'
import { useSession } from 'bonde-core-tools'
import Empty from './Empty'
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

const SubContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 30px 60px;
`

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const EmptyWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
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
          <Tab onClick={() => { console.log('redirect to admin') }}>Outras configurações</Tab>
        </Navigation>
      </SubHeader>
      <SubContent>
        <Switch>
          <Route exact path={`${match.path}/mobilizers`}>
            <Mobilizers community={community} />
          </Route>
        </Switch>
      </SubContent>
    </PageWrap>
  ) : (
    <EmptyWrap>
      <Empty />
      <Header.h4>Selecione uma comunidade</Header.h4>
    </EmptyWrap>
  )
}

CommunityPage.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default CommunityPage
