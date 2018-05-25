import React from 'react'
import { Grid, Cell } from 'bonde-styleguide'
import { translate } from '../../../../services/i18n'
import { withLastLocation } from '../../../../services/router'
import { editHeader } from '../../../../components/Header'
import { Tourtip, tourtip } from '../../../../components/Tourtip'
import { CommunityList, MobilizationList, TrendingMobs } from './components'

class Home extends React.Component { 
  
  render () {

    const { t } = this.props

    return (
      <Grid>
        <Cell size={[12, 12, 12]}>
          <Grid>
            <Cell size={[4, 4]}>
              <Tourtip
                tourName='tour'
                title='Acesse suas comunidades'
                description='A comunidade é um grupo que se une por uma causa. A partir dela você pode criar mobilizações e convidar outras pessoas para chegar junto.'
                step={3}
              >
                <CommunityList t={t} />
              </Tourtip>
            </Cell>
            <Cell size={[8, 8]}>
              <Tourtip
                tourName='tour'
                title='Crie mobilizações pra causar'
                description='É através das mobilizações que você vai gerar um impacto. Aqui você pode ver as mobs das suas comunidades e acessá-las com um clique.'
                step={4}
                placement='bottom-right'
              >
                <MobilizationList t={t} />
              </Tourtip>
            </Cell>
          </Grid>
        </Cell>
        <Cell size={[12, 12, 12]}>
          <Tourtip
            tourName='tour'
            title='Crie mobilizações pra causar'
            description='É através das mobilizações que você vai gerar um impacto. Aqui você pode ver as mobs das suas comunidades e acessá-las com um clique.'
            step={5}
            placement='top-left'
          >
            <TrendingMobs t={t} />
          </Tourtip>
        </Cell>
      </Grid>
    )
  }
}

export default translate('home')(
  editHeader({
    pageTitle: ({ t }) => t('title'),
    actions: ({ t }) => [
      { label: t('actionButtons.mobilization'), dark: true },
      { label: t('actionButtons.community') }
    ]
  })(
    withLastLocation(
      tourtip({
        init: ({ lastLocation }) => lastLocation && lastLocation.pathname === '/admin/tags'
      })(Home)
    )
  )
)

