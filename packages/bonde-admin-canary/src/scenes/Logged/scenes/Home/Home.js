import React from 'react'
import { I18n } from 'react-i18next'
import { Grid, Cell } from 'bonde-styleguide'
import { Page, Header } from 'components/PageLogged'
import { Redirect } from 'services/router'
import { Tourtip } from 'components/Tourtip'
import { CommunitiesGadget, MobilizationList, TrendingMobs } from './components'
import TrendingMobilizationsGadget from './components/TrendingMobilizations'
import ActionMenu from './ActionMenu'

export default ({ user }) => (
  <I18n ns='home'>
  {(t) => {

    if (user.tags.length < 1) return <Redirect to='/admin/tags' />

    return (
      <Page
        renderTitle={() => <Header.Title>Home</Header.Title>}
        renderLeftDropdown={() => <Header.CommunitiesDropdown path='/communities' />}
        renderActionButtons={ActionMenu}
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
                <TrendingMobilizationsGadget />
              </Tourtip>
            </Cell>
          </Grid>
      </Page>
    )
  }}
  </I18n>
)

