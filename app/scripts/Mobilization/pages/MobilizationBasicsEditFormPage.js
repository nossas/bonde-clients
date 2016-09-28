import React, { Component, PropTypes } from 'react'

import { MobilizationBasicsForm } from '../components/settings'

const MobilizationBasicsEditFormPage = props => (
  <div className="clearfix overflow-auto">
    <div className="col-6 clearfix py3 pr4 pl5">
      <MobilizationBasicsForm
        {...props}
        className="transparent"
        floatButton="Salvar"
      />
    </div>
  </div>
)

MobilizationBasicsEditFormPage.propTypes = {
  mobilization: PropTypes.object.isRequired
}

export default MobilizationBasicsEditFormPage
