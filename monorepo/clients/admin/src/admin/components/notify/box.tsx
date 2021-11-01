import PropTypes from 'prop-types'


const Box = ({ title, children, icon, styles }) => (
  <div className={styles.notifyBox}>
    <span className={styles.notifyBoxIcon}>
      <i className={`fa fa-${icon}`} />
    </span>

    <div className={styles.notifyBoxContent}>
      <div className={styles.notifyBoxTitle}>
        {title}
      </div>
      <div className={styles.notifyBoxMessage}>
        {children}
      </div>
    </div>
  </div>
)

Box.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
  icon: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
}

Box.defaultProps = {
  styles: import('./box.scss'),
  icon: 'info-circle'
}

export default Box
