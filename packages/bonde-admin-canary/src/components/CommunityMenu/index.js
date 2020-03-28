import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Icon } from 'bonde-components'
import { useSession } from 'bonde-core-tools'

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

const MenuItem = ({ icon, title, onClick }) => (
  <Button dark onClick={onClick} title={title}>
    <Icon name={icon} size='small' />
  </Button>
)

MenuItem.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

const urls = {
  settings: '/community/mobilizers',
  mobilization: new URL('/mobilizations', process.env.REACT_APP_DOMAIN_ADMIN || 'http://app.bonde.devel').href,
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
  const history = useHistory()
  const { onChange } = useSession()
  const { modules } = community

  const click = (url) => async (evt) => {
    await onChange({ community })
    if (url.startsWith('http')) {
      window.location.href = url
    } else {
      history.push(url)
    }
  }
  return (
    <MenuStyled>
      {Object.keys(modules).filter(key => !!modules[key]).map(key => (
        <MenuItem
          key={key}
          icon={items[key][0]}
          title={items[key][1]}
          onClick={click(urls[key])} />
      ))}
    </MenuStyled>
  )
}

CommunityMenu.propTypes = {
  community: PropTypes.object.isRequired
}

export default CommunityMenu
