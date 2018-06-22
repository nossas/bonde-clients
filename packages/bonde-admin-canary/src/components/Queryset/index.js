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
    pageIndex: 0,
    filter: this.props.filter
  }

  handleChangeFilter (filter, refetch) {
    const offset = 0
    this.setState({ offset, page: 1, filter })

    refetch({ ...filter })
  }

  handleChangePage (page, fetchMore) {
    const pageIndex = page - 1
    const offset = pageIndex * this.state.limit
    this.setState({ pageIndex, offset })

    fetchMore({
      variables: { offset },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        
        return Object.assign({}, prev, {
          data: fetchMoreResult.data
        })
      }
    })
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
        {({ loading, data, refetch, fetchMore }) => {
          return this.props.children({
            data,
            loading,
            filter: this.state.filter,
            onChangeFilter: f => this.handleChangeFilter(f, refetch),
            page: this.state.pageIndex + 1,
            onChangePage: p => this.handleChangePage(p, fetchMore)
          })
        }}
      </Query>
    )
  }
}

Queryset.propTypes = {
  query: PropTypes.object.isRequired,
  limit: PropTypes.number,
  filter: PropTypes.object
}

Queryset.defaultProps = {
  filter: {}
}

export default Queryset
