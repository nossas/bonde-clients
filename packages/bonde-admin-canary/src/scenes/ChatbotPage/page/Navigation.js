import React from 'react'
import { Navigation, Tab } from 'bonde-components'
import { useLocation, useHistory } from 'react-router'

const ChatbotNavigation = () => {
  const { push } = useHistory()
  const { pathname } = useLocation()

  const handleClick = (path) => () => {
    push(path)
  }

  return (
    <Navigation>
      <Tab
        active={new RegExp(/^\/chatbot(\/)*$/).test(pathname)}
        onClick={handleClick('/chatbot')}
      >
        Fluxos de conversas
      </Tab>
      <Tab
        active={new RegExp(/^\/chatbot\/menu(\/)*$/).test(pathname)}
        onClick={handleClick('/chatbot/menu')}
      >
        Menu persistente
      </Tab>
      <Tab
        active={new RegExp(/^\/chatbot\/settings(\/)*$/).test(pathname)}
        onClick={handleClick('/chatbot/settings')}
      >
        Configurações
      </Tab>
    </Navigation>
  )
}

export default ChatbotNavigation
