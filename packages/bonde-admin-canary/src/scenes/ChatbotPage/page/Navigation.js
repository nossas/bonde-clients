import React from 'react'
import { Navigation, Tab } from 'bonde-components'
import { useLocation, useHistory } from 'react-router'

const re = (...expressions) => ({
  test: (pathname) => {
    let acc = false
    expressions.forEach((regex) => {
      const actual = new RegExp(regex).test(pathname)
      if (actual) acc = actual
    })
    return acc
  }
})

const ChatbotNavigation = () => {
  const { push } = useHistory()
  const { pathname } = useLocation()

  const handleClick = (path) => () => {
    push(path)
  }

  const isActiveHome = re(
    /^\/chatbot(\/)*$/,
    /^\/chatbot\/campaign\/(\d|new)+(\/)*$/
  ).test(pathname)

  return (
    <Navigation>
      <Tab
        active={isActiveHome}
        onClick={handleClick('/chatbot')}
      >
        Fluxos de conversas
      </Tab>
      <Tab
        active={re(/^\/chatbot\/menu(\/)*$/).test(pathname)}
        onClick={handleClick('/chatbot/menu')}
      >
        Menu persistente
      </Tab>
      <Tab
        active={re(/^\/chatbot\/settings(\/)*$/).test(pathname)}
        onClick={handleClick('/chatbot/settings')}
      >
        Configurações
      </Tab>
    </Navigation>
  )
}

export default ChatbotNavigation
