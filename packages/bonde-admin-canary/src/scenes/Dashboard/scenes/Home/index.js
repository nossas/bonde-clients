import React from 'react'
import { I18n } from 'react-i18next'
import {
  Grid,
  Cell,
  Flexbox2 as Flexbox
} from 'bonde-styleguide'
import { useSession } from 'bonde-core-tools'
import { ToastContainer } from 'components/Notification'
import {
  CommunitiesGadget,
  TrendingMobilizationsGadget,
  Header
} from './components'

const HomePage = () => {
  const { user } = useSession()

  return (
    <I18n ns='home'>
      {t => {
        // if (user.tags.length < 1) return <Redirect to='/admin/tags' />
        // Render HomePage only if user has tags
        return (
          <Flexbox vertical>
            <ToastContainer />
            <Grid>
              <Cell size={[12, 12, 12]}>
                <Grid>
                  <Cell size={[6, 6, 12, 12, 12, 12]}>
                    <CommunitiesGadget />
                  </Cell>
                  <Cell size={[6, 6, 12, 12, 12, 12]}>
                    <TrendingMobilizationsGadget user={user} />
                  </Cell>
                </Grid>
              </Cell>
            </Grid>
          </Flexbox>
        )
      }}
    </I18n>
  )
}

HomePage.Header = Header

export default HomePage
