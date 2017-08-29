import { connect } from 'react-redux'
import { gql } from 'react-apollo'
import { addNotification as notify } from 'reapop'
import * as CommunitySelectors from '~client/community/selectors'
import {
  ListableHOC,
  SelectableHOC,
  FilterableHOC
} from './component/listable'
import Container from './container'

const allActivistsQuery = gql`
  query allActivists ($search: String, $communityId: Int, $first: Int, $offset: Int) {
    searchActivistsOnCommunity (
      first: $first,
      offset: $offset,
      ctxCommunityId: $communityId,
      query: $search
    ) {
      totalCount,
      nodes {
        id,
        name,
        email,
        phone,
        mobilizations
      }
    }
  }
`

const allActivistsIdQuery = gql`
  query allActivistsIdQuery ($search: String, $communityId: Int) {
    searchActivistsOnCommunity (
      ctxCommunityId: $communityId,
      query: $search
    ) {
      nodes {
        id
      }
    }
  }
`

const mapStateToProps = (state) => ({
  communityId: CommunitySelectors.getCurrentId(state)
})

const mapActionsToProps = (dispatch) => ({
  listableHandleError: () => {
    dispatch(notify({
      status: 'error',
      title: 'Ooops!',
      message: 'Problemas de conexão com o servidor',
      dismissAfter: 0,
      dismissable: true,
      closeButton: false
    }))
  }
})

const mapQueryParams = ({ communityId, query }) => ({
  communityId,
  search: query
})

const Listable = ListableHOC({
  query: allActivistsQuery,
  queryParams: mapQueryParams,
  queryName: 'searchActivistsOnCommunity',
  parse: ({ mobilizations, ...data }) => ({
    ...data,
    mobilizations: JSON.parse(mobilizations)
  }),
  limit: 50
})

const Selectable = SelectableHOC({
  query: allActivistsIdQuery,
  queryParams: mapQueryParams,
  queryName: 'searchActivistsOnCommunity',
  parse: ({ id }) => id
})

const Filterable = FilterableHOC()

export default connect(mapStateToProps, mapActionsToProps)(
  Filterable(
    Selectable(
      Listable(
        Container
      )
    )
  )
)
