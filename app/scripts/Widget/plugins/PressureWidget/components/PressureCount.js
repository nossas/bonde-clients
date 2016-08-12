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
  const pressureCountSpanStyle = {
    color: totalColor,
    fontSize: '2.3em'
  }
  const pressureSpanStyle = {
    color: '#555353',
    lineHeight: '54px'
  }
  return (
    <div className="pressure-count p2 bg-white rounded-bottom clearfix" style={pressureCount}>
      <span className="md-col md-col-6 px1 bold right-align" style={pressureCountSpanStyle}>{total}</span>
      <span className="md-col md-col-6 px1 bold" style={pressureSpanStyle}>pressões feitas</span>
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
