import React from 'react'
import { Link } from 'react-router'
import * as Paths from '../Paths'
import classNames from 'classnames'
import { TabMenuItem } from './'

export default class ConfigurationsMenu extends React.Component {
  render(){
    const { mobilization, location } = this.props
    const basicsMobilizationPath = Paths.basicsMobilization(mobilization.id)
    const cityMobilizationPath = Paths.cityMobilization(mobilization.id)
    const analyticsMobilizationPath = Paths.analyticsMobilization(mobilization.id)

    return(
      <div className="bg-white px3 clearfix">
        <h2 className="mb3">Configure sua mobilização</h2>
        <div>
          <ul className="list-reset mb0">
            <TabMenuItem
              path={basicsMobilizationPath}
              text="Informações básicas"
              isActive={basicsMobilizationPath == location.pathname}
            />
            <TabMenuItem
              path={cityMobilizationPath}
              text="Cidade"
              isActive={cityMobilizationPath == location.pathname}
            />
            <TabMenuItem
              path={analyticsMobilizationPath}
              text="Google Analytics"
              isActive={analyticsMobilizationPath == location.pathname}
            />
          </ul>
        </div>
      </div>
    )
  }
}
