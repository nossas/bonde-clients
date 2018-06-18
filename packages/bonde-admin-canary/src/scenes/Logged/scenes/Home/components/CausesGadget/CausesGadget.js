import React from 'react'
import { Gadget } from 'components'
import { Grid } from 'bonde-styleguide'
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
    const { mutate, loading, mobilizations } = this.props
    const { filter } = this.state

    return (
      <Gadget
        title='Causando por aí'
        renderFilter={() => (
          <div>
            Mobilizações
            <CausesFilterDropdown
              selected={filter}
              mutate={mutate}
              onChange={this.changeSelectedFilter}
            />
          </div>
        )}
      >
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
