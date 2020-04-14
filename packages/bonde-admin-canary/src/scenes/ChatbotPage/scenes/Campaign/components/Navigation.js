import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router'
import { Flexbox2 as Flexbox, Icon } from 'bonde-styleguide'
import { ButtonLink } from 'components/Link'

const Navigation = ({ match }) => {
  const { pathname } = useLocation()
  const baseUrl = pathname.replace(match.url, '')
  if (match.params.campaignId === 'new') {
    return (
      <Flexbox horizontal middle>
        <ButtonLink flat to={baseUrl} active>Criar</ButtonLink>
        <Icon name='arrow-right' />
        <ButtonLink flat to={match.url} disabled>Editar</ButtonLink>
      </Flexbox>
    )
  } else {
    const newUrl = match.url.replace(/\/\d+$/, '/new')
    return (
      <Flexbox horizontal middle>
        <ButtonLink flat to={newUrl}>Criar</ButtonLink>
        <Icon name='arrow-right' />
        <ButtonLink flat to={match.url} active={match.isExact}>Editar</ButtonLink>
      </Flexbox>
    )
  }
}

Navigation.propTypes = {
  // is very important this prop be a reference of outside component match
  match: PropTypes.object.isRequired
}

export default Navigation
