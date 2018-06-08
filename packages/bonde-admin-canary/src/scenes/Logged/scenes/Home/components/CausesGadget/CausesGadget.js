import React from 'react'
<<<<<<< HEAD
import { Grid, Flexbox } from 'bonde-styleguide'
import { Gadget } from 'components'
=======
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { Gadget, Grid, Cell, Panel, Flexbox, Dropdown, DropdownItem } from 'bonde-styleguide'
>>>>>>> refator(admin-canary): trending mobs to causes gadget
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
<<<<<<< HEAD
    const { mutate, loading, mobilizations } = this.props
=======
    const { t, mutate, loading, mobilizations } = this.props
>>>>>>> refator(admin-canary): trending mobs to causes gadget
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
