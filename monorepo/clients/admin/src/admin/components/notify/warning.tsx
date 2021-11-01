import PropTypes from 'prop-types'
import Box from './box'


const styles = import('./warning.scss')

function Warning({ title, children }) {
  return <Box
    title={title}
    styles={styles}
    icon='exclamation-triangle'
  >
    {children}
  </Box>
}

Warning.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
  children: PropTypes.any.isRequired
}

export default Warning
