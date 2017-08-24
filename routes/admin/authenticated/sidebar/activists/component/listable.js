import React from 'react'
import { withApollo } from 'react-apollo'

export const ListableHOC = ({
  // [gql]: Query carregamento dos dados.
  query,
  // [object | function]: Parametros utilizados na query caso exista. Se
  // função recebe `ownProps` e deve retornar um `object`.
  queryParams,
  // [integer]: Linhas por página
  limit,
  // [string]: Nome da query utilizada. É usado para mapear as propriedades
  // do componente envovlido.
  queryName,
  parse,
  handleError
}) => (WrappedComponent) => {
  class PP extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        loading: false,
        data: [],
        totalCount: 0,
        page: 0
      }
    }

    getPaginationParams () {
      return {
        first: limit,
        offset: this.state.page * limit
      } 
    }

    fetch () {
      this.setState({ loading: true })
      this.props.client.query({
        query,
        variables: {
          ...this.getPaginationParams(),
          ...queryParams(this.props)
        }
      }).then(({ data }) => {
        const all = data[queryName] ? data[queryName].nodes : []
        this.setState({
          loading: data.loading,
          data: all.map(parse),
          totalCount: data[queryName] ? data[queryName].totalCount : 0,
        })
      }).catch((err) => {
        this.setState({ loading: false })
        const handle = handleError || this.props.listableHandleError
        handle(err)
      })
    }

    handleNextPage () {
      this.setState({ page: this.state.page + 1 }, this.fetch)
    }

    handlePreviousPage () {
      if (this.state.page > 0) {
        this.setState({ page: this.state.page - 1 }, this.fetch)
      }
    }

    render () {
      return (
        <WrappedComponent
          {...this.props}
          // Fetching
          fetch={this.fetch.bind(this)}
          loading={this.state.loading}
          data={this.state.data}
          totalCount={this.state.totalCount}
          // Pagination
          indexPage={(this.state.page + 1)}
          lastPage={(parseInt(this.state.totalCount / limit) + 1)}
          onNextPage={this.handleNextPage.bind(this)}
          onPreviousPage={this.handlePreviousPage.bind(this)}
        />
      )
    }
  }
  
  return withApollo(PP)
}

export const SelectableHOC = ({
  // [gql]: Query carregamento dos dados.
  query,
  // [object | function]: Parametros utilizados na query caso exista. Se
  // função recebe `ownProps` e deve retornar um `object`.
  queryParams
}) => (WrappedComponent) => {
  class PP extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        selected: []
      }
    }
    
    handleSelectAll () {
      this.props.client.query({
        query,
        variables: typeof queryParams === 'function'
          ? queryParams(this.props) : queryParams 
      }).then((response) => {
        debugger
      }).catch((err) => {
        debugger
      })
    }

    handleSelectRow (id) {
      if (this.state.selected.indexOf(id) !== -1) {
        this.setState({
          selected: this.state.selected.filter(sid => sid !== id)
        })
      } else {
        this.setState({
          selected: [...this.state.selected, id]
        })
      }
    }

    render () {
      return (
        <WrappedComponent
          {...this.props}
          selected={this.state.selected}
          onSelectAll={this.handleSelectAll.bind(this)}
          onSelectRow={this.handleSelectRow.bind(this)}
        />
      )
    }
  }

  return withApollo(PP)
}

export const FilterableHOC = () => (WrappedComponent) => {
  class PP extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        query: ''
      }
    }

    onChange (e) {
      this.setState({ query: e.target.value })
    }

    render () {
      return (
        <WrappedComponent
          {...this.props}
          query={this.state.query}
          onQueryChange={this.onChange.bind(this)}
        />
      )
    }
  }

  return PP
}
