// import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

const Raise: React.FC<RaiseProperties> = ({ className, error, componentClass, ...props }) => {
  const Component = componentClass !== undefined ? componentClass : 'span'
  return (
    <Component className={classnames('red', className)} {...props}>{` - ${error}`}</Component>
  )
}

interface RaiseProperties {
  error: string;
  componentClass: any;
  className?: string;
}

export default Raise
