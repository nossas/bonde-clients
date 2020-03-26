import React from 'react'
import styled from 'styled-components'
import { Button, Icon } from 'bonde-components'

const MenuStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  button {
    border: none;
    padding: 0;
  }

  ${Icon} {
    margin-left: 10px;
  }
`

const click = (name) => (evt) => {
  console.log(name, evt)
}

const MenuItem = ({ icon, title }) => (
  <Button dark onClick={click(icon)} title={title}>
    <Icon name={icon} size='small' />
  </Button>
)


export default ({ community }) => {
  const { modules: { redes, chatbot, settings, mobilization } } = community
  return (
    <MenuStyled>
      {settings && <MenuItem icon='Settings' title='Configurações' />}
      {mobilization && <MenuItem icon='Window' title='Mobilizações' />}
      {redes && <MenuItem icon='Network' title='Redes' />}
      {!isNaN(chatbot) && <MenuItem icon='Bot' title='Chatbot' />}
    </MenuStyled>
  )
}