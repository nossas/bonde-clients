import React, { PropTypes } from 'react'

const ForceDownloadViaAjax = props => {
  const { onClick, community: { id, name } } = props
  return (
    <div className="DownloadItem" style={{ cursor: 'pointer' }}>
      <p>
        <span>{name}</span>
        <a href="#" onClick={() => onClick(id)}>Baixar Relatório</a>
      </p>
    </div>
  )
}

ForceDownloadViaAjax.propTypes = {
  onClick: PropTypes.object.isRequired,
  community: PropTypes.object.isRequired
}

export default ForceDownloadViaAjax
