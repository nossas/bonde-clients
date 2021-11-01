import classnames from 'classnames'
import PropTypes from 'prop-types'


function Progress({ className, style, percent }) {
  return <div className={classnames('progress col-12 border rounded border-darken-4')} >
    <div
      className={className}
      style={{ ...style, width: `${percent}%` }} >
      <br />
    </div>
  </div>
}

Progress.propTypes = {
  percent: PropTypes.number.isRequired,
  className: PropTypes.string,
  style: PropTypes.object
}

export default Progress
