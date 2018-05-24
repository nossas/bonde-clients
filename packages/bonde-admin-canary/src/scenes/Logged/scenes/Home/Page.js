import React from 'react'
import { translate } from '../../../../services/i18n'
import { Grid, Cell } from 'bonde-styleguide'
import { editHeader } from '../../../../components/Header'

import { CommunityList, MobilizationList, TrendingMobs } from './components'

class Home extends React.Component { 
  
  render () {

    const { t } = this.props

    return (
      <Grid>
        <Cell size={[12, 12, 12]}>
          <Grid>
            <Cell size={[4, 4]}>
              <CommunityList t={t} />
            </Cell>
            <Cell size={[8, 8]}>
              <MobilizationList t={t} />
            </Cell>
          </Grid>
        </Cell>
        <Cell size={[12, 12, 12]}>
          <TrendingMobs t={t} />
        </Cell>
      </Grid>
    )
  }
}

export default translate('home')(editHeader({
  pageTitle: ({ t }) => t('title'),
  actions: ({ t }) => [
    { label: t('actionButtons.mobilization'), dark: true },
    { label: t('actionButtons.community') }
  ]
})(Home))

