import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

export default ({ rowComponent: RowComponent }) =>
  (WrappedComponent) => {
    class PP extends React.Component {
      render() {
        const {
          children,
          data,
          fieldIndex,
          rowIndex: rowSelectedIndex,
          onSelectRow
        } = this.props
        const dataGridProperties = {
          className: classnames('flex flex-column', this.props.className),
          data: WrappedComponent !== 'div' ? data : null
        }

        return (
          <WrappedComponent {...this.props} {...dataGridProperties}>
            {data && data.map((item, rowIndex) => (
              <RowComponent
                key={`rowIndex-${rowIndex}`}
                actived={rowSelectedIndex === rowIndex}
                onSelectRow={() => {
                  onSelectRow && onSelectRow(item, rowIndex)
                }}
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
