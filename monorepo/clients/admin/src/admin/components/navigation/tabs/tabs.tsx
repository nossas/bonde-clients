import classnames from 'classnames'
import PropTypes from 'prop-types'


function Tabs({ children, className, style }) {
  return <nav
    className={classnames('tabs gray20', className)}
    style={style}
  >
    {children}
  </nav>
}

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  style: PropTypes.string
}

export default Tabs
