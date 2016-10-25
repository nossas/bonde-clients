import React, { Component, PropTypes } from 'react'
import { Navigation } from 'react-router'
import reactMixin from 'react-mixin'

import * as Paths from '../../../../Paths'
import { SelectableList, SelectableListItem } from '../../../../../components/SelectableList'

//
// TODO: To decorate page with Navigation without class statement, is need to upgrade react-router.
// See: http://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
// This is used to navigate back to history. This is still be necessary? Or manipulate
// it from <FormRedux> component may be contemplates it?
//
@reactMixin.decorate(Navigation)
class MobilizationTemplatesChoosePage extends Component {
  render() {
    return (
      <div className="p3 lg-col-5 mx-auto">
        <h3 className="h1 mt0 mb3 center">Como você deseja começar?</h3>
        <SelectableList>
          <SelectableListItem leftIcon="plus-square-o" title="Criar mobilização do zero" />
          <SelectableListItem leftIcon="columns" title="Meus templates" subtitle="18" />
          <SelectableListItem leftIcon="globe" title="Templates globais" subtitle="34" />
        </SelectableList>
      </div>
    )
  }
}

export default MobilizationTemplatesChoosePage
