import React, { PropTypes } from 'react'

import * as Paths from '../../../../Paths'
import {
  BrowsableList,
  BrowsableListItem
} from '../../../../../components/Navigation/BrowsableList'
import { MobilizationAddLayout } from '../../../../../modules/mobilizations/components'

const MobilizationTemplatesChoosePage = ({ mobilization, mobilizationTemplates }) => (
  <div>
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
        subtitle={mobilizationTemplates.custom.length}
        path={Paths.mobilizationTemplatesChooseCustomList(mobilization)}
      />
      <BrowsableListItem
        leftIcon="globe"
        title="Templates globais"
        subtitle={mobilizationTemplates.global.length}
        path={Paths.mobilizationTemplatesChooseGlobalList(mobilization)}
      />
    </BrowsableList>
  </div>
)

MobilizationTemplatesChoosePage.propTypes = {
  mobilization: PropTypes.object,
  mobilizationTemplates: PropTypes.object,
}

export default MobilizationTemplatesChoosePage
