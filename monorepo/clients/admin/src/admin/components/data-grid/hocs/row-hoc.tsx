import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

export default (WrappedComponent) => {
  class PP extends React.Component {
    render() {
      const { data, onSelectRow, rowIndex, actived, className, children } = this.props
      const rowProperties = {
        className: classnames(
          'flex',
          className,
          { 'active': actived }
        ),
        data: WrappedComponent !== 'div' ? data : null,
        rowIndex: WrappedComponent !== 'div' ? rowIndex : null,
        onSelectRow
      }
      return (
        <WrappedComponent {...rowProperties}>
          {children && children({ data, rowIndex })}
        </WrappedComponent>
      )
    }
  }

  PP.propTypes = {
    data: PropTypes.oneOf([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object
    ])
  }

  return PP
}
