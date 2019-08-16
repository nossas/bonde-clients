import React from 'react'
import PropTypes from 'prop-types'
import { Flexbox2 as Flexbox, Icon } from 'bonde-styleguide'
import { ButtonLink } from 'components/Link'

const Navigation = ({ match, location }) => {
  const baseUrl = location.pathname.replace(match.url, '')
  return (
    <Flexbox horizontal middle>
      <ButtonLink flat to={`${match.url}/new`} active={baseUrl === '/new'}>Criar</ButtonLink>
      <Icon name='arrow-right' />
      <ButtonLink flat active={match.isExact} to={match.url}>Editar</ButtonLink>
      <Icon name='arrow-right' />
      <ButtonLink flat to={`${match.url}/detail`} active={baseUrl === '/detail'}>Detalhes</ButtonLink>
    </Flexbox>
  )
}

Navigation.propTypes = {
  // is very important this prop be a reference of outside component match
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default Navigation