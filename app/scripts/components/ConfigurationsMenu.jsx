import React, { PropTypes } from 'react'

import * as Paths from '../Paths'
import { Tabs, Tab } from '../../components/Navigation'

export default class ConfigurationsMenu extends React.Component {
  static propTypes = {
    mobilization: PropTypes.object.isRequired,
    location: PropTypes.string.isRequired
  }

  render() {
    const { mobilization, location } = this.props
    const basicsMobilizationPath = Paths.basicsMobilization(mobilization.id)
    const cityMobilizationPath = Paths.cityMobilization(mobilization.id)
    const sharingMobilizationPath = Paths.sharingMobilization(mobilization.id)
    const analyticsMobilizationPath = Paths.analyticsMobilization(mobilization.id)
    const customDomainMobilizationPath = Paths.customDomainMobilization(mobilization.id)

    return (
      <div className="bg-white pt3 pr4 pl5">
        <h1 className="h1 mt0 mb3">Configure sua mobilização</h1>
        <Tabs>
          <Tab
            text="Informações básicas"
            path={basicsMobilizationPath}
            isActive={basicsMobilizationPath === location.pathname}
          />
          <Tab
            text="Cidade"
            path={cityMobilizationPath}
            isActive={cityMobilizationPath === location.pathname}
          />
          <Tab
            text="Compartilhamento"
            path={sharingMobilizationPath}
            isActive={sharingMobilizationPath === location.pathname}
          />
          <Tab
            text="Google Analytics"
            path={analyticsMobilizationPath}
            isActive={analyticsMobilizationPath === location.pathname}
          />
          <Tab
            text="Domínio"
            path={customDomainMobilizationPath}
            isActive={customDomainMobilizationPath === location.pathname}
          />
        </Tabs>
      </div>
    )
  }
}
