import classnames from 'classnames'
import PropTypes from 'prop-types'


function Raise({ className, error, componentClass, ...properties }) {
  const Component = componentClass !== undefined ? componentClass : 'span'
  return (
    <Component className={classnames('red', className)} {...properties}>{` - ${error}`}</Component>
  )
}

Raise.propTypes = {
  error: PropTypes.string.isRequired
}

export default Raise
