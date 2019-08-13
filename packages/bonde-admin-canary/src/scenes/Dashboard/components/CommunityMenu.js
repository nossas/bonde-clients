import React from 'react'
import PropTypes from 'prop-types'
import { Button, Flexbox2 as Flexbox, Icon } from 'bonde-styleguide'
import { ButtonLink } from 'components/Link'
import { authSession } from 'services/auth'
import { toSnakeCase } from 'scenes/Dashboard/utils'

const menus = ({ community }) => [
  {
    icon: 'chart',
    component: ButtonLink,
    to: `/admin/${community.id}/analytics`
  },
  {
    icon: 'bot',
    component: ButtonLink,
    to: `/admin/${community.id}/chatbot`
  },
  {
    icon: 'window',
    component: Button,
    onClick: () => {
      authSession
        .setAsyncItem('community', toSnakeCase(community))
        .then(() => {
          const baseUrl = process.env.REACT_APP_DOMAIN_ADMIN || 'http://app.bonde.devel:5001'
          window.open(baseUrl, '_blank')
        })
    }
  },
  {
    icon: 'settings',
    component: ButtonLink,
    to: `/admin/${community.id}/settings`
  }
]

const CommunityMenu = ({ community, dark, pathname }) => {
  return (
    <Flexbox horizontal spacing='between'>
      {menus({ community }).map(({ component: Component, icon, ...rest }, i) => {
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
