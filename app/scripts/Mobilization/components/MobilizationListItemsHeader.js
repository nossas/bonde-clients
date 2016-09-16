import React, { PropTypes } from 'react'

import './scss/mobilization-list-items-header.scss'

const MobilizationListItemsHeader = () => (
  <div className="mobilization-list-items-header block clearfix caps mb2">
    <div className="list-items-header-avatar avatar-width left pr3" />
    <i className="list-items-header-more fa fa-ellipsis-h right pr3" />
    <div className="list-items-table-header-container overflow-hidden">
      <div className="list-items-header-name px3 col col-4">
        Nome <i className="fa fa-long-arrow-down ml1" />
      </div>
      <div className="list-items-header-created-at px3 col col-2">
        Criada em
      </div>
      <div className="list-items-header-users px3 col col-2">
        Usuários
      </div>
      <div className="list-items-header-fund-raising px3 col col-2">
        Arrecadações
      </div>
    </div>
  </div>
)

export default MobilizationListItemsHeader
