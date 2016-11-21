import React, { Component, PropTypes } from 'react'
import { Navigation } from 'react-router'
import reactMixin from 'react-mixin'

import * as Paths from '../../Paths'
import { MobilizationCityForm } from '../components/settings'

//
// TODO: To decorate page with Navigation without class statement, is need to upgrade react-router.
// See: http://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
// This is used to navigate back to history. This is still be necessary? Or manipulate
// it from <FormRedux> component may be contemplates it?
//
@reactMixin.decorate(Navigation)
class MobilizationCityNewPage extends Component {
  render() {
    return (
      <div className="p3 lg-col-5 mx-auto">
        <h3 className="h1 mt0 mb3 center">Qual é a sua cidade?</h3>
        <MobilizationCityForm
          {...this.props}
          className="bg-white"
          next={mobilization => this.transitionTo(Paths.mobilizationTemplatesChoose(mobilization))}
        />
      </div>
    )
  }
}

export default MobilizationCityNewPage
