import React from 'react'
import PropTypes from 'prop-types'
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

const click = (url) => (evt) => {
  window.location.href = url
}

const MenuItem = ({ icon, title, url }) => (
  <Button dark onClick={click(url)} title={title}>
    <Icon name={icon} size='small' />
  </Button>
)

MenuItem.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

const urls = {
  settings: process.env.REACT_APP_DOMAIN_ADMIN || 'http://app.bonde.devel',
  mobilization: process.env.REACT_APP_DOMAIN_ADMIN || 'http://app.bonde.devel',
  chatbot: process.env.REACT_APP_DOMAIN_BOT || 'http://chatbot.bonde.devel',
  redes: process.env.REACT_APP_DOMAIN_REDES || 'http://redes.bonde.devel'
}

const items = {
  settings: ['Settings', 'Configurações'],
  mobilization: ['Window', 'Mobilizações'],
  redes: ['Network', 'Redes'],
  chatbot: ['Bot', 'Chatbot']
}

const CommunityMenu = ({ community }) => {
  const { modules } = community
  return (
    <MenuStyled>
      {Object.keys(modules).filter(key => !!modules[key]).map(key => (
        <MenuItem key={key} icon={items[key][0]} title={items[key][1]} url={urls[key]} />
      ))}
    </MenuStyled>
  )
}

CommunityMenu.propTypes = {
  community: PropTypes.object.isRequired
}

export default CommunityMenu
