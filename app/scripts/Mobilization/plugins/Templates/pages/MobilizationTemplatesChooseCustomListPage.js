import React, { PropTypes, Component } from 'react'

import * as Paths from '../../../../Paths'
// import { SelectableList, SelectableListItem } from '../../../../../components/SelectableList'

const MobilizationTemplatesChooseCustomListPage = ({ mobilization }) => (
  <div className="p3 lg-col-5 mx-auto">
    <h3 className="h1 mt0 mb3 center">Meus Templates</h3>
  </div>
)

MobilizationTemplatesChooseCustomListPage.propTypes = {
  mobilization: PropTypes.object.isRequired
}

export default MobilizationTemplatesChooseCustomListPage
