import React from 'react'
import { Route as ReactRoute, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const Route = ({
  assert,
  component: Component,
  componentProps,
  redirectTo,
  ...ownProps
}) => {
  const valid = typeof assert === 'function' ? assert() : assert

  return (
    <ReactRoute
      {...ownProps}
      render={props => (
        (valid || !redirectTo) ? (
          <Component {...props} {...componentProps} />
        ) : (
          <Redirect
            to={{ pathname: redirectTo, state: { from: props.location } }}
          />
        )
      )}
    />
  )
}

Route.defaultProps = {
  assert: true,
  componentProps: {}
}

Route.propTypes = {
  assert: PropTypes.any,
  component: PropTypes.func,
  componentProps: PropTypes.object,
  redirectTo: PropTypes.string,
  location: PropTypes.object
}

export default Route
