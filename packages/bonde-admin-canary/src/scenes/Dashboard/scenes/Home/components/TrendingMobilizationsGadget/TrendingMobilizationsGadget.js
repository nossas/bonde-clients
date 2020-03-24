import React, { Fragment } from 'react'
import { I18n } from 'react-i18next'
import { Grid, Cell, Panel } from 'bonde-styleguide'
import { useQuery } from 'bonde-core-tools'
import { Gadget } from 'components'
import Loading from './Loading'
import trendingMobilizationsQuery from './query.graphql'
import PropTypes from 'prop-types'

const TrendingMobilizationsGadget = ({ mobilizations, loading }) => (
  <I18n ns='home'>
    {(t) => (
      <Gadget
        title={t('gadgets.trendingMobilizations.title')}
      >
        <Grid>
          {loading ? <Loading /> : mobilizations.map(mobilization => {
            return (
              <Fragment key={Math.random()}>
                <Cell size={[6, 6, 6, 12, 12, 12]}>
                  <Panel
                    image={mobilization.facebookShareImage}
                    title={mobilization.name}
                    author={`Por ${mobilization.community.name}`}
                    onClick={() => {
                      if (!mobilization.customDomain) {
                        const domain = process.env.REACT_APP_DOMAIN_PUBLIC || 'bonde.devel:5003'
                        const url = new URL(`http://${mobilization.slug}.${domain}`)
                        window.open(url, '_blank')
                      } else {
                        const url = new URL(`http://${mobilization.customDomain}`)
                        window.open(url, '_blank')
                      }
                    }}
                  />
                </Cell>
              </Fragment>
            )
          })}
        </Grid>
      </Gadget>
    )}
  </I18n>
)

TrendingMobilizationsGadget.propTypes = {
  mobilizations: PropTypes.any,
  loading: PropTypes.bool
}

const TrendingMobilizationsQueryset = ({ user }) => {
  const { data, loading, error } = useQuery(trendingMobilizationsQuery, { variables: { userId: user.id } })

  const to = m => ({
    id: m.id,
    name: m.name,
    goal: m.goal,
    facebookShareImage: m.facebook_share_image,
    customDomain: m.custom_domain,
    slug: m.slug,
    community: m.community
  })

  return !error ? (
    <TrendingMobilizationsGadget
      mobilizations={data && data.mobilizations ? data.mobilizations.map(to) : []}
      loading={loading}
    />
  ) : <p>Erro ao buscar mobilizações!</p>
}

TrendingMobilizationsQueryset.propTypes = {
  user: PropTypes.object.isRequired
}

export default TrendingMobilizationsQueryset
