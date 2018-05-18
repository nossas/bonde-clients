import React from 'react'
import { translate } from '../../services/i18n'
import { Grid, Cell, Backdrop, Loading, Title, Text } from 'bonde-styleguide'

import { PageAdmin } from '../../components'
import { CommunityList, MobilizationList, TrendingMobs } from './components'

class Home extends React.Component {
  state = {
    loading: true,
    splash: false,
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({ splash: true, loading: false })
      setTimeout(() => this.setState({ splash: false }), 3000)
    }, 5000)
  }

  render () {
    const { t } = this.props
    const { loading, splash } = this.state

    return (
      <PageAdmin title={t('title')}>
        {loading && (
          <Backdrop color='#FFFFFF'>
            <Text align='center' margin={{ top: '20vh' }}>
              <Loading size={109} />
            </Text>
            <Title.H3 align='center' lineHeight={1.29}>
              Preparando<br />
              o seu BONDE
            </Title.H3>
          </Backdrop>
        )}

        {splash && (
          <Backdrop color='rgba(255, 255, 255, .7)'>
            <Text align='center' margin={{ top: '15vh' }}>
              <Loading size={109} />
            </Text>
            <Title.H3 align='center' lineHeight={1.29}>
              Esse BONDE é<br />
              todo seu, Maria.<br />
              Chega mais!
            </Title.H3>
          </Backdrop>
        )}

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
  }
}

export default translate('home')(Home)
