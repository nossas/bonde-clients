import React from 'react'
import { translate } from '../../services/i18n'
import { Grid, Cell } from 'bonde-styleguide'

import { PageAdmin } from '../../components'
import { CommunityList, MobilizationList, TrendingMobs } from './components'

const Home = ({ t, i18n }) => (
  <PageAdmin title={t('title')}>
    <Grid>
      <Cell size={[12, 12, 12]}>
        <Grid>
          <Cell size={[4, 4]}><CommunityList t={t} /></Cell>
          <Cell size={[8, 8]}><MobilizationList t={t} /></Cell>
        </Grid>
      </Cell>
      <Cell size={[12, 12, 12]}><TrendingMobs t={t} /></Cell>
    </Grid>
  </PageAdmin>
)

export default translate('home')(Home)
