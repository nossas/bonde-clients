import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'
import { Header, Navigation, Tab, Row, Col } from 'bonde-components'
// import { useSession } from 'bonde-core-tools'
import Content from 'components/Content'

import CommunityForm from './CommunityForm'
// import Mobilizers from './Mobilizers'

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

const UserPage = ({ match }) => {
  // const { user } = useSession()

  // RegexWith parameters number
  // \/community\/\d+\/mobilizers\/*
  // const isActive = new RegExp(/\/user\/profile\/*/).test(location.pathname)

  return (
    <PageWrap>
      <SubHeader>
        <Header.h3>Superusuário</Header.h3>
        <Navigation>
          <Tab active>Criar Comunidade</Tab>
        </Navigation>
      </SubHeader>
      <Content>
        <Row>
          <Col>
            <Switch>
              <Route exact path={`${match.path}/add`}>
                <CommunityForm />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Content>
    </PageWrap>
  )
}

UserPage.propTypes = {
  // location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default UserPage
