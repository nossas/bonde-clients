import React from 'react'
import { Grid, Cell } from 'bonde-styleguide'
import { translate } from 'services/i18n'
import { Page, Header } from '../../components/Page2'
import { withLastLocation, Redirect } from 'services/router'
import { auth } from 'services/auth'
import { Tourtip, tourtip } from 'components/Tourtip'
import { CommunitiesGadget, MobilizationList, TrendingMobs } from './components'

const HomeTabs = () => (
  <React.Fragment>
    <Header.Tab to='/admin'>Dashboard</Header.Tab>
    <Header.Tab to='/admin/mobilizations'>Mobilizações</Header.Tab>
    <Header.Tab to='/admin/communities'>Comunidades</Header.Tab>
  </React.Fragment>
)

const HomePage = translate('home')(
  ({ t, user }) => {

    if (user.tags.length < 1) return <Redirect to='/admin/tags' />

    return (
      <Page
        renderTitle={() => <Header.Title>Home</Header.Title>}
        renderLeftDropdown={() => <Header.CommunitiesDropdown path='/communities' />}
        renderActionButtons={() => ([
          <Header.ActionButton
            dark
            to='/admin/mobilization/add'
            label={t('actionButtons.mobilization')}
          />,
          <Header.ActionButton
            to='/admin/community/add'
            label={t('actionButtons.community')}
          />
        ])}
        renderTabs={HomeTabs}
      >
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
                    <CommunitiesGadget />
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
      </Page>
    )
  }
)

export default withLastLocation(
  tourtip({
    init: ({ lastLocation }) => lastLocation && lastLocation.pathname === '/admin/tags'
  })(auth()(HomePage))
)

