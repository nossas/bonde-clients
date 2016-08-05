import React, { PropTypes } from 'react'


const PressureCount = ({ total, totalColor }) => {
  /* TODO: support all browser
   * -webkit-box-shadow: inset 0px 15px 18px -10px rgba(227,224,227,1);
   * -moz-box-shadow: inset 0px 15px 18px -10px rgba(227,224,227,1);
   * box-shadow: inset 0px 15px 18px -10px rgba(227,224,227,1);
   */
  const pressureCount = {
    boxShadow: "inset 0px 15px 18px -10px rgba(227,224,227,1)",
  }
  return (
    <div className="pressure-count p3 bg-white rounded-bottom" style={pressureCount}>
      <p className="center m0">
        <span style={{color: totalColor}}>{total}</span>&nbsp;<span>pressões feitas</span>
      </p>
    </div>
  )
}

PressureCount.propTypes = {
  total: PropTypes.number,
  totalColor: PropTypes.string
}

PressureCount.defaultProps = {
  total: 0,
}

export default PressureCount
