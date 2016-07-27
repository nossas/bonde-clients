import React, { PropTypes } from 'react'

import { Link } from 'react-router'

import MobilizationCard from './MobilizationCard'


const MobilizationList = ({ mobilizations, newMobilizationURL, editMobilizationURL }) => {
  const menuStyle = {
    marginTop: '12px',
    borderColor: '#2FBEE6',
    borderWidth: '4px'
  }

  return (
    <div className="flex-auto bg-silver gray">
      <h2 className="bg-white mt0 px4 clearfix align-middle">
        <div className="left border-bottom py2" style={menuStyle}>
          <i className="fa fa-flag-o mr2 aqua" />
          Suas Mobilizações
        </div>
        {(newMobilizationURL !== undefined && typeof newMobilizationURL === 'function' ?
          <Link
            to={newMobilizationURL()}
            className="button bg-aqua caps h4 py2 right mt2">
            <i className="fa fa-plus mr2" />
            Nova mobilização
          </Link>
        : null)}
      </h2>
      <div className="col-6 mx-auto py3 px4">
        {mobilizations && mobilizations.map((mobilization) => {
            return <MobilizationCard
                      key={'mobilization-' + mobilization.id}
                      editMobilizationURL={editMobilizationURL}
                      mobilization={mobilization} />
          })
        }
      </div>
    </div>
  )
}

MobilizationList.propTypes = {
  mobilizations: PropTypes.array.isRequired,
  newMobilizationURL: PropTypes.func,
  editMobilizationURL: PropTypes.func,
}

export default MobilizationList
