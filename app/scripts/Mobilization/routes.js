import React, { Component } from 'react'
import { Route, IndexRoute } from 'react-router'

import { MobilizationListPage } from '../pages'


// TODO: Change to UserDashboard
class WrapperMobilizationApp extends Component {

  static fetchData(store) {
    console.log('enter fetch data')
  }

  render() {
    return (
      <div className="wrap-mobilization">
        {this.props.children}
      </div>
    )
  }
}


export default (
  <Route component={WrapperMobilizationApp}>
    <Route path="/test" component={MobilizationListPage} />
  </Route>
)
