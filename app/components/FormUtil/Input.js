import React, { PropTypes } from 'react'
import classnames from 'classnames'

const Input = ({ uid, type, label, placeholder, onChange, required, show, classes }) => (
  <div className="mb2" style={{ display: !show ? 'none' : 'block' }}>
    <label className="h4 caps bold mb1">{label}{required ? ' *' : ''}</label>
    <input
      id={'input-'+uid}
      className={classnames('field-light block full-width h3', classes)}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      required={required}
    />
  </div>
)

Input.propTypes = {
  uid: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  show: PropTypes.bool,
  classes: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
}

Input.defaultProps = {
  onChange: () => {},
  required: false,
  show: true,
  classes: []
}

export default Input
