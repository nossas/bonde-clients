import React, { PropTypes } from 'react'

const ForceDownloadViaAjax = ({ onClick, title, className }) => (
  <div className='DownloadItem' style={{ cursor: 'pointer' }}>
    <p>
      <a className={className} href='#' onClick={onClick}>
        {title}
      </a>
    </p>
  </div>
)

ForceDownloadViaAjax.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export default ForceDownloadViaAjax
