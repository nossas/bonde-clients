import React, { Component, PropTypes } from 'react'

import { MobilizationCityForm } from '../components/settings'

const MobilizationCityEditPage = props => (
  <div className="clearfix overflow-auto">
    <div className="col-6 clearfix py3 pr4 pl5">
      <MobilizationCityForm
        {...props}
        className="transparent"
        floatButton="Salvar"
      />
    </div>
  </div>
)

export default MobilizationCityEditPage
