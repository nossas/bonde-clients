import React from 'react'
import PropTypes from 'prop-types'
import { Button, Flexbox2 as Flexbox, Icon } from 'bonde-styleguide'
import { ButtonLink } from 'components/Link'
import { authSession } from 'services/auth'

const menuBuilder = (menuName, { community, module }) => ({
  'dashboard': {
    icon: 'chart',
    component: ButtonLink,
    to: `/admin/${community.id}/analytics`
  },
  'chatbot': {
    icon: 'bot',
    component: ButtonLink,
    to: `/admin/${community.id}/chatbot/${module}`
  },
  'mobilization': {
    icon: 'window',
    component: Button,
    onClick: () => {
      authSession
        .setAsyncItem('community', community)
        .then(() => {
          const baseUrl = process.env.REACT_APP_DOMAIN_ADMIN || 'http://app.bonde.devel:5001'
          window.open(baseUrl, '_blank')
        })
    }
  },
  'settings': {
    icon: 'settings',
    component: ButtonLink,
    to: `/admin/${community.id}/settings`
  }
})[menuName]

const CommunityMenu = ({ community, dark, pathname }) => {
  const modules = JSON.parse(community.modules)

  const menus = Object.keys(modules).map((moduleName) => {
    const module = modules[moduleName]
    if (module) {
      return menuBuilder(moduleName, { community, module })
    }
    return null
  }).filter(obj => !!obj)

  return (
    <Flexbox horizontal spacing='between' justify='flex-end'>
      {menus.map(({ component: Component, icon, ...rest }, i) => {
        const ownProps = {
          ...rest, dark, flat: true, active: pathname && pathname.startsWith(rest.to)
        }
        return (
          <Component key={`community-menu-${i}`} {...ownProps}>
            <Icon size={20} name={icon} />
          </Component>
        )
      })}
    </Flexbox>
  )
}

CommunityMenu.propTypes = {
  community: PropTypes.object.isRequired,
  pathname: PropTypes.string,
  dark: PropTypes.bool
}

export default CommunityMenu
