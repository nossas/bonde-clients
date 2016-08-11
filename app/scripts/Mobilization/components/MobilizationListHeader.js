import React, { PropTypes } from 'react'

import { Link } from 'react-router'


const MobilizationListHeader = ({ hideButton, redirectToAdd }) => {
  const menuStyle = {
    marginTop: '12px',
    borderColor: '#2FBEE6',
    borderWidth: '4px'
  }

  return (
    <h2 className="bg-white mt0 px4 clearfix align-middle">
      <div className="left border-bottom py2" style={menuStyle}>
        <i className="fa fa-flag-o mr2 aqua" />
        Suas Mobilizações
      </div>
      {(redirectToAdd !== undefined && typeof redirectToAdd === 'function' ?
        <Link
          to={redirectToAdd()}
          className="button bg-aqua caps h4 py2 right mt2">
          <i className="fa fa-plus mr2" />
          Nova mobilização
        </Link>
      : null)}
    </h2>
  )
}

MobilizationListHeader.propTypes = {
  redirectToAdd: PropTypes.func
}

export default MobilizationListHeader
