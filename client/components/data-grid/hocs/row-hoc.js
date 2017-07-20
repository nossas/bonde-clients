import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default (WrappedComponent) => {
  class PP extends React.Component {
    render () {
      const { data, rowIndex, children } = this.props
      const rowProps = {
        className: classnames('flex', this.props.className),
        data: WrappedComponent !== 'div' ? data : null,
        rowIndex: WrappedComponent !== 'div' ? rowIndex : null
      }
      return (
        <WrappedComponent {...rowProps}>
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
    ]),
    rowIndex: PropTypes.oneOf([
      PropTypes.string,
      PropTypes.number
    ])
  }

  return PP
}
