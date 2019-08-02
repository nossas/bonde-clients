import PropTypes from 'prop-types'
import styled from 'styled-components'

const Spark = styled.path.attrs({
  d: props => props.d
})`
  fill: ${props => props.colorInit};
  animation: ${props => `${props.animation} ${props.duration} infinite`};
`

Spark.propTypes = {
  d: PropTypes.string.isRequired, // vector path attribute
  colorInit: PropTypes.string.isRequired,
  animation: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired
}

Spark.displayName = 'Spark'

export default Spark
