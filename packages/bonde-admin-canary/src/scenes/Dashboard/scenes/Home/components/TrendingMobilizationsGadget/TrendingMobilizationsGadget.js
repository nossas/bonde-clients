import React, { Fragment } from 'react'
import { I18n } from 'react-i18next'
import { Query } from 'react-apollo'
import { Grid, Cell, Panel } from 'bonde-styleguide'
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

const TrendingMobilizationsQueryset = () => {
  const parseMobilization = m => ({
    id: m.id,
    name: m.name,
    goal: m.goal,
    facebookShareImage: m.facebook_share_image,
    customDomain: m.custom_domain,
    slug: m.slug,
    community: m.community,
    score: m.activist_actions_aggregate.aggregate.count
  })

  // subtract 90 days
  const today = new Date()
  today.setDate(today.getDate() - 90)
  // Fix many requests on api
  const createdAt = today.toISOString().slice(0, 10)

  return (
    <Query query={trendingMobilizationsQuery} variables={{ created_at: createdAt }}>
      {({ data, loading, error }) => {
        return (
          <TrendingMobilizationsGadget
            mobilizations={data && data.anonymous_mobilizations ? data.anonymous_mobilizations.map(parseMobilization) : []}
            loading={loading}
          />
        )
      }}
    </Query>
  )
}

export default TrendingMobilizationsQueryset
