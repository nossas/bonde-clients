import React from 'react'
import { connect } from 'react-redux'

import { actionCreators as SelectableActions } from '../../../../components/SelectableList'
import { TemplateSelectableList } from '../components'

import * as TemplateSelectors from '../selectors'
import * as MobilizationSelectors from '../../selectors'


const TemplateChooseGlobalPage = ({ mobilization, ...listableProps }) => (
  <div className='choose-global-page'>
    <h3 className='h1 mt0 mb3 center'>Templates globais</h3>
    <TemplateSelectableList
      {...listableProps}
      handleSelectItem={(index, item) => {
        debugger
      }}
    />
  </div>
)

const mapStateToProps = (state) => ({
  mobilization: MobilizationSelectors.getCurrent(state),
  templates: TemplateSelectors.getGlobalTemplates(state),
  filterableTemplates: TemplateSelectors.getFilterableTemplates(state),
  selectedIndex: TemplateSelectors.getSelectableIndex(state),
})

const mapActionCreatorsToProps = {
  setSelectedIndex: SelectableActions.setSelectedIndex,
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(TemplateChooseGlobalPage)
