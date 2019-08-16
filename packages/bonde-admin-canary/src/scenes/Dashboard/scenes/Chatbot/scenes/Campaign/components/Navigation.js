import React from 'react'
import PropTypes from 'prop-types'
import { Flexbox2 as Flexbox, Icon } from 'bonde-styleguide'
import { ButtonLink } from 'components/Link'

const Navigation = ({ match, location }) => {
  const baseUrl = location.pathname.replace(match.url, '')
  if (match.params.campaignId === 'new') {
    return (
      <Flexbox horizontal middle>
        <ButtonLink flat to={baseUrl} active>Criar</ButtonLink>
        <Icon name='arrow-right' />
        <ButtonLink flat to={match.url} disabled>Editar</ButtonLink>
        <Icon name='arrow-right' />
        <ButtonLink flat to={`${match.url}/detail`} disabled>Detalhes</ButtonLink>
      </Flexbox>
    )
  } else {
    const newUrl = match.url.replace(/\/\d+$/, '/new')
    return (
      <Flexbox horizontal middle>
        <ButtonLink flat to={newUrl}>Criar</ButtonLink>
        <Icon name='arrow-right' />
        <ButtonLink flat to={match.url} active={match.isExact}>Editar</ButtonLink>
        <Icon name='arrow-right' />
        <ButtonLink flat to={`${match.url}/detail`} active={baseUrl === '/detail'}>Detalhes</ButtonLink>
      </Flexbox>
    )
  }
}

Navigation.propTypes = {
  // is very important this prop be a reference of outside component match
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default Navigation
