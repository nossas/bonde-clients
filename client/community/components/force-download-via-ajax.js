import React, { PropTypes } from 'react'

const ForceDownloadViaAjax = ({ onClick, title }) => (
  <div className='DownloadItem' style={{ cursor: 'pointer' }}>
    <p>
      <a href='#' onClick={onClick}>{title}</a>
    </p>
  </div>
)

ForceDownloadViaAjax.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export default ForceDownloadViaAjax
