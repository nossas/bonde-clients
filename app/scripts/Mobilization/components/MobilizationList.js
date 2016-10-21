import React, { PropTypes } from 'react'

export const MobilizationList = ({ children }) => {
  return (
    <div className="mobilization-list gray20 pl5 pr4 py4 content-box">
      {children}
    </div>
  )
}

MobilizationList.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
}

export default MobilizationList
