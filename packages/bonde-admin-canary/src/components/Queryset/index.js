import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'

// Queryset: componento para realizar o fetch dos dados
// que implementa as seguintes funcionalidades
// - Paginação **TODO**
// - Filter

class Queryset extends React.Component {
  
  state = {
    offset: 0,
    limit: this.props.limit,
    page: 1,
    filter: this.props.filter
  }

  handleChangeFilter (filter, refetch) {
    const offset = 0
    this.setState({ offset, page: 1, filter })

    refetch({ ...filter })
  }

  render () {
    return (
      <Query
        query={this.props.query}
        variables={{
          offset: this.state.offset,
          limit: this.state.limit,
          ...this.state.filter
        }}
      >
        {({ loading, data, refetch }) => {
          return this.props.children({
            data,
            loading,
            onChangeFilter: f => this.handleChangeFilter(f, refetch)
          })
        }}
      </Query>
    )
  }
}

Queryset.propTypes = {
  query: PropTypes.object.isRequired,
  limit: PropTypes.number.isRequired,
  filter: PropTypes.object
}

Queryset.defaultProps = {
  filter: {}
}

export default Queryset
