import React from 'react'
import { I18n } from 'react-i18next'
import {
  Grid,
  Cell,
  Flexbox2 as Flexbox
} from 'bonde-styleguide'
import { ToastContainer } from 'components/Notification'
import { Auth } from 'services/auth'
import { Redirect } from 'services/router'
import {
  CommunitiesGadget,
  TrendingMobilizationsGadget,
  Dialog,
  Header
} from './components'

const HomePage = () => (
  <I18n ns='home'>
    {t => (
      <Auth>
        {({ user }) => {
          if (user.tags.length < 1) return <Redirect to='/admin/tags' />
          // Render HomePage only if user has tags
          return (
            <Flexbox vertical>
              <ToastContainer />
              <Grid>
                <Cell size={[12, 12, 12]}>
                  <Grid>
                    <Cell size={[6, 6, 12, 12, 12, 12]}>
                      <Dialog t={t} step={2}>
                        <CommunitiesGadget />
                      </Dialog>
                    </Cell>
                    <Cell size={[6, 6, 12, 12, 12, 12]}>
                      <Dialog t={t} step={3} placement='left-top'>
                        <TrendingMobilizationsGadget user={user} />
                      </Dialog>
                    </Cell>
                  </Grid>
                </Cell>
              </Grid>
            </Flexbox>
          )
        }}
      </Auth>
    )}
  </I18n>
)

HomePage.Header = Header

export default HomePage
