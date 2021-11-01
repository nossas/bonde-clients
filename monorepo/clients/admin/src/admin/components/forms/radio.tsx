import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

class Radio extends React.Component {
  render() {
    const { children, alignment, className, checked, value, onChange } = this.props
    const id = `radio-${value}-id`
    const current = {
      horizontal: { classes: 'pr2' },
      vertical: { classes: 'block pb1' }
    }[alignment]

    const style = { cursor: 'pointer' }
    if (alignment === 'vertical') {
      style.display = 'block'
    }

    return (
      <label
        className={classnames('form-radio', className, current.classes)}
        style={style}
        htmlFor={id}
      >
        <input
          type='radio'
          id={id}
          className='mr1'
          value={value}
          onChange={onChange}
          checked={checked === value}
        />
        {children}
      </label>
    )
  }
}

Radio.propTypes = {
  checked: PropTypes.any,
  alignment: PropTypes.oneOf(['horizontal', 'vertical'])
}

Radio.defaultProps = {
  alignment: 'horizontal'
}

export default Radio
