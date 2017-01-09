import React from 'react'
import { connect } from 'react-redux'

import * as MobilizationSelectors from '../../selectors'
import * as TemplateSelectors from '../selectors'

import {
  BrowsableList,
  BrowsableListItem
} from '../../../../components/Navigation/BrowsableList'
import * as Paths from '../../../../scripts/Paths'


const TemplateChoosePage = props => {

  const { mobilization, templatesGlobalLength, templatesCustomLength } = props

  return (
    <div className="choose-menu-page">
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
          subtitle={templatesCustomLength}
          path={Paths.mobilizationTemplatesChooseCustomList(mobilization)}
        />
        <BrowsableListItem
          leftIcon="globe"
          title="Templates globais"
          subtitle={templatesGlobalLength}
          path={Paths.mobilizationTemplatesChooseGlobalList(mobilization)}
        />
      </BrowsableList>
    </div>
  )
}

const mapStateToProps = state => ({
  mobilization: MobilizationSelectors.getCurrent(state),
  templatesGlobalLength: TemplateSelectors.getGlobalTemplates(state).length,
  templatesCustomLength: TemplateSelectors.getCustomTemplates(state).length,
})

export default connect(mapStateToProps)(TemplateChoosePage)
