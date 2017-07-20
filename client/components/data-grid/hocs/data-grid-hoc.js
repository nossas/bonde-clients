import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default ({ fieldIndex, rowComponent: RowComponent }) =>
  (WrappedComponent) => {
    class PP extends React.Component {
      render () {
        const dataGridProps = {
          className: classnames('flex flex-column', this.props.className),
          data: WrappedComponent !== 'div' ? data : null
        }
        const { children, data } = this.props

        return (
          <WrappedComponent {...dataGridProps}>
            {data && data.map((item, rowIndex) => (
              <RowComponent
                key={`rowIndex-${rowIndex}`}
                data={item}
                rowIndex={fieldIndex ? item[fieldIndex] : rowIndex}
              >
                {children}
              </RowComponent>
            ))} 
          </WrappedComponent>
        )
      }
    }

    PP.propTypes = {
      data: PropTypes.array
    }

    PP.defaultProps = {
      data: []
    }

    return PP
  }
