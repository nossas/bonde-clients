import React, { PropTypes, Component } from 'react'
import { Navigation } from 'react-router'
import reactMixin from 'react-mixin'

import * as Paths from '../../../../Paths'
import { MobilizationTemplatesSelectableList } from '../components'

@reactMixin.decorate(Navigation)
export class MobilizationTemplatesChooseCustomListPage extends Component {
  render() {
    const { mobilization, mobilizationTemplates } = this.props
    return (
      <div className="p3 lg-col-5 mx-auto">
        <h3 className="h1 mt0 mb3 center">Meus Templates</h3>
        <MobilizationTemplatesSelectableList
          list={mobilizationTemplates.list}
          onClickButton={() => this.transitionTo(Paths.editMobilization(mobilization.id))}
        />
      </div>
    )
  }
}

MobilizationTemplatesChooseCustomListPage.propTypes = {
  mobilization: PropTypes.object,
  mobilizationTemplates: PropTypes.object,
}

export default MobilizationTemplatesChooseCustomListPage
