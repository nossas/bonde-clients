import React, { PropTypes } from 'react'

import * as Paths from '../../../../Paths'
import {
  BrowsableList,
  BrowsableListItem
} from '../../../../../components/Navigation/BrowsableList'

const MobilizationTemplatesChoosePage = ({ mobilization }) => (
  <div className="p3 lg-col-5 mx-auto">
    <h3 className="h1 mt0 mb3 center">Como você deseja começar?</h3>
    <BrowsableList>
      <BrowsableListItem
        leftIcon="plus-square-o"
        title="Criar mobilização do zero"
        path={Paths.editMobilization(mobilization.id)}
      />
      <BrowsableListItem
        leftIcon="columns"
        title="Meus templates"
        subtitle="18"
        path={Paths.mobilizationTemplatesChooseCustomList(mobilization)}
      />
      <BrowsableListItem
        leftIcon="globe"
        title="Templates globais"
        subtitle="34"
      />
    </BrowsableList>
  </div>
)

MobilizationTemplatesChoosePage.propTypes = {
  mobilization: PropTypes.object.isRequired
}

export default MobilizationTemplatesChoosePage
