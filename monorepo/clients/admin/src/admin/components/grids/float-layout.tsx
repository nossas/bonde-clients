import PropTypes from 'prop-types'


function FloatLayout(properties) {
  return <div className={properties.position}>
    {properties.children}
  </div>
}

FloatLayout.propTypes = {
  position: PropTypes.oneOf(['floatTopRight', 'floatTopLeft'])
}

export default FloatLayout
