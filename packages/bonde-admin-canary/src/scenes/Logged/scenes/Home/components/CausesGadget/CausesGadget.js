import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { Gadget, Grid, Cell, Panel, Flexbox, Dropdown, DropdownItem } from 'bonde-styleguide'
import { CausesFilterDropdown, CausesCellsLoading, CausesCells } from './components'

class CausesGadget extends React.Component {
  state = {  filter: 'now' }

  changeSelectedFilter = filter => {
    this.setState({ filter })
  }

  componentWillMount (old, next) {
    this.props.mutate({ variables: { days: CausesFilterDropdown.FILTERS.now.period } })
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
            <CausesFilterDropdown
              selected={filter}
              mutate={mutate}
              onChange={this.changeSelectedFilter}
            />
          </div>
        </Flexbox>
      )]}>
        <Grid>
          {loading
            ? <CausesCellsLoading cells={4} />
            : <CausesCells cells={4} mobilizations={mobilizations} />
          }
        </Grid>
      </Gadget>
    )
  }
}

export default CausesGadget
