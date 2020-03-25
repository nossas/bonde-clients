import React from 'react'
import { I18n } from 'react-i18next'
import { useSession } from 'bonde-core-tools'
import styled from 'styled-components'
import { ToastContainer } from 'components/Notification'
import {
  CommunitiesGadget,
  TrendingMobilizationsGadget,
  Header
} from './components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: auto;
  flex-grow: 1;
  padding: 20px 0;
  align-items: flex-start;
  justify-content: space-between;

  > div {
    width: calc(50% - 20px);
  }

  @media only screen and (max-width: 768px) {
    flex-direction: column;

    > div {
      width: 100%;

      padding: 0 0 30px;
    }

    .hide-xs {
      display: none;
    }
  }
`

const HomePage = () => {
  const { user } = useSession()

  return (
    <I18n ns='home'>
      {t => (
        <>
          <ToastContainer />
          <Container>
            <CommunitiesGadget />
            <TrendingMobilizationsGadget user={user} />
          </Container>
        </>
      )}
    </I18n>
  )
}

HomePage.Header = Header

export default HomePage
