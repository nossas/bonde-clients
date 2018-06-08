import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { Gadget, Grid, Cell, Panel, Flexbox, Dropdown, DropdownItem } from 'bonde-styleguide'
import { mutation } from 'graphql'
import { Mobilizations } from 'graphql/mutations'

const FILTERS = {
  now: {
    label: 'Para agir agora',
    period: 2
  },
  inspire: {
    label: 'Para se inspirar',
    period: 90
  },
}

class TrendingMobs extends React.Component {
  state = { filter: 'now' }

  handleFilter = filter => {
    this.setState({ filter })
    this.props.mutate({ variables: { days: FILTERS[filter].period } })
  }

  componentWillMount (old, next) {
    this.props.mutate({ variables: { days: FILTERS.now.period } })
  }

  render () {
    const { t, mutate, loading, mobilizations } = this.props
    const { filter } = this.state

    return (
      <Gadget title={[(
        <Flexbox horizontal style={{ marginTop: 32 }}>
          Causando por aí
          <div>
            Mobilizações
            <Dropdown
              light
              label={FILTERS[filter].label}
              style={{ display: 'inline-block', marginLeft: 15 }}
            >
              <DropdownItem onClick={() => this.handleFilter('now')}>
                {FILTERS.now.label}
              </DropdownItem>
              <DropdownItem onClick={() => this.handleFilter('inspire')}>
                {FILTERS.inspire.label}
              </DropdownItem>
            </Dropdown>
          </div>
        </Flexbox>
      )]}>
        <Grid>
          {loading
            ? Array(4).fill('').map(() => (
              <Cell size={[3, 3]}>
                <Panel loading image='' title='' description='' author='' />
              </Cell>
            ))
            : mobilizations.slice(0, 4).map(mobilization => (
              <Cell size={[3, 3]}>
                <Panel
                  image={mobilization.facebook_share_image}
                  title={mobilization.name}
                  description={mobilization.goal}
                  author={`Por ${mobilization.community_name}`}
                />
              </Cell>
            )
          )}
        </Grid>
      </Gadget>
    )
  }
}

export default mutation({
  mutation: Mobilizations.mutation,
  props: Mobilizations.props
})(TrendingMobs)
