import PropTypes from 'prop-types'
import Box from './box'


const styles = import('./info.scss')

function Info({ title, children }) {
  return <Box
    title={title}
    styles={styles}
    icon='info-circle'
  >
    {children}
  </Box>
}

Info.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
  children: PropTypes.any.isRequired
}

export default Info
