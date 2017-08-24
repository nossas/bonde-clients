import React from 'react'
import { withApollo, graphql } from 'react-apollo'

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
  parse
}) => (WrappedComponent) => {

  class PP extends React.Component {
    
    constructor (props) {
      super(props)
      this.state = {
        loading: false,
        data: [],
        totalCount: 0
      }
    }

    getPaginationParams () {
      const { location } = this.props
      return {
        first: limit,
        offset: (
          location &&
          location.query.page &&
          (location.query.page - 1) * limit
        ) || 0
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
      })
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          fetch={this.fetch.bind(this)}
          loading={this.state.loading}
          data={this.state.data}
          totalCount={this.state.totalCount}
        />
      )
    }
  }
  
  /*
  const withGraphql = graphql(query, {
    skip: true, 
    options: (ownProps) => {
      let options = {
        variables: {
          first: limit,
          offset: (
            ownProps.location &&
            ownProps.location.query.page &&
            (ownProps.location.query.page - 1) * limit
          ) || 0
        }
      }

      if (typeof queryParams === 'function') {
        options = {
          variables: {
            ...queryParams(ownProps),
            ...options.variables
          }
        }
      } else if (typeof queryParams === 'object') {
        options = {
          variables: {
            ...queryParams,
            ...options.variables
          }
        } 
      }
      
      return options
    },
    props: ({ data, ownProps: { location } }) => {
      const all = data[queryName] ? data[queryName].nodes : []
      debugger
      return {
        loading: data.loading,
        data: all.map(parse),
        totalCount: data[queryName] ? data[queryName].totalCount : 0,
        refetch: data.refetch,
        onNextPage: () => {
          browserHistory.push({
            ...location,
            query: {
              ...location.query,
              page: parseInt(location.query.page || 1) + 1
            }
          })
        },
        onPreviousPage: () => {
          const previousPage = parseInt(location.query.page || 1) - 1
          if (previousPage > 0) {
            browserHistory.push({
              ...location,
              query: {
                ...location.query,
                page: previousPage
              }
            })
          }
        }
      }
    }
  })
  */
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

    constructor(props) {
      super(props)
      this.state = {
        selected: []
      }
    }
    
    handleSelectAll() {
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

    handleSelectRow(id) {
      if (this.state.selected.find(id) !== -1) {
        this.setState({
          selected: this.state.selected.filter(sid => sid !== id)
        })
      } else {
        this.setState({
          selected: [...this.state.selected, id]
        })
      }
    }

    render() {
      
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
    
    constructor(props) {
      super(props)
      this.state = {
        query: ''
      }
    }

    onChange (e) {
      this.setState({ query: e.target.value })
    }

    render() {
      
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
