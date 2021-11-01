import classnames from 'classnames'
import PropTypes from 'prop-types'


function InputCounter({ maxLength, length, className }) {
  const diff = maxLength - length

  return (
    <span className={classnames(className, { red: diff < 11 })}>
      {diff}
    </span>
  )
}

InputCounter.propTypes = {
  maxLength: PropTypes.number.isRequired,
  length: PropTypes.number,
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
}

export default InputCounter
