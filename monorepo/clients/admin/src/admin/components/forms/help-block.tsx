import classnames from 'classnames'
import PropTypes from 'prop-types'


function HelpBlock({ children, className }) {
  return <div className={classnames('muted my2', className)}>
    <small className='block'>
      <dfn>{children}</dfn>
    </small>
  </div>
}

HelpBlock.propTypes = {
  className: PropTypes.string
}

export default HelpBlock
