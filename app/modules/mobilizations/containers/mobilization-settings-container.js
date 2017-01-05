import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as MobilizationSelectors from '../selectors'

import { SettingsPageLayout, SettingsPageMenuLayout } from '../../../components/Layout'
import { Tabs, Tab } from '../../../components/Navigation'
import * as Paths from '../../../scripts/Paths'


const MobilizationSettingsContainer = (props) => {
  const { children, mobilization, location: { pathname } } = props

  const basicsPath = Paths.basicsMobilization(mobilization.id)
  const sharingPath = Paths.sharingMobilization(mobilization.id)
  const analyticsPath = Paths.analyticsMobilization(mobilization.id)
  const customDomainPath = Paths.customDomainMobilization(mobilization.id)

  return (
    <SettingsPageLayout>
      <SettingsPageMenuLayout title='Configure sua mobilização'>
        <Tabs>
          <Tab
            text='Informações básicas'
            path={basicsPath}
            isActive={basicsPath === pathname}
          />
          <Tab
            text='Compartilhamento'
            path={sharingPath}
            isActive={sharingPath === pathname}
          />
          <Tab
            text='Google Analytics'
            path={analyticsPath}
            isActive={analyticsPath === pathname}
          />
          <Tab
            text='Domínio'
            path={customDomainPath}
            isActive={customDomainPath === pathname}
          />
        </Tabs>
      </SettingsPageMenuLayout>
      {children}
    </SettingsPageLayout>
  )
}

MobilizationSettingsContainer.propTypes = {
  mobilization: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

const mapStateToProps = (state, props) => ({
  mobilization: MobilizationSelectors.getCurrent(state)
})

export default connect(mapStateToProps)(MobilizationSettingsContainer)
