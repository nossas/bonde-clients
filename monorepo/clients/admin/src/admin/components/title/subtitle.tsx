import classnames from 'classnames'
import PropTypes from 'prop-types'


const styles = import('./subtitle.scss')

function Subtitle({ children, className }) {
  return <span className={classnames(styles.subtitle, className)}>
    {children}
  </span>
}

Subtitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
}

export default Subtitle
