import { Entity } from 'draft-js'
import PropTypes from 'prop-types'


function Link({ children, entityKey }) {
  const { href, target } = Entity.get(entityKey).getData()

  return (
    <a href={href} target={target}>{children}</a>
  )
}

Link.propTypes = {
  entityKey: PropTypes.string.isRequired
}

export default Link
