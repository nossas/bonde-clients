import React, { PropTypes, Component } from 'react'
import { Navigation } from 'react-router'
import reactMixin from 'react-mixin'

import * as Paths from '../../../../Paths'
import { MobilizationTemplatesSelectableList } from '../components'

@reactMixin.decorate(Navigation)
export class MobilizationTemplatesChooseGlobalListPage extends Component {
  render() {
    const { mobilization, mobilizationTemplates } = this.props
    return (
      <div className="p3 lg-col-5 mx-auto">
        <h3 className="h1 mt0 mb3 center">Templates globais</h3>
        <MobilizationTemplatesSelectableList
          list={mobilizationTemplates.global}
          onClickButton={() => this.transitionTo(Paths.editMobilization(mobilization.id))}
        />
      </div>
    )
  }
}

MobilizationTemplatesChooseGlobalListPage.propTypes = {
  mobilization: PropTypes.object,
  mobilizationTemplates: PropTypes.object,
}

export default MobilizationTemplatesChooseGlobalListPage
