import React from 'react'
import { gql, withApollo } from 'react-apollo'
import Select from 'react-select'

const tagsByCommunityQuery = gql`
  query tagsByCommunityQuery ($communityId: Int!, $search: String) {
    filterCommunityTags (
        ctxCommunityId: $communityId,
        search: $search
    ) {
      nodes {
        tagCompleteName
      }
    }
  }
`


const FilterForm = ({ name, query, onQueryChange, communityId, client }) => {
  const getOptions = (input) => {
    return client.query({
      query: tagsByCommunityQuery,
      variables: {
        communityId,
        search: input
      }
    })
    .then((response) => {
      const { data } = response
      return {
        options: data.filterCommunityTags.nodes.map(tag => ({
          value: tag.tagCompleteName,
          label: tag.tagCompleteName
        }))
      }
    })
    .catch((error) => {
      // TODO
      console.log(error)
    })
  }

  const parseValueToEvent = (opt) => onQueryChange({
    target: {
      value: opt.value
    }
  })

  return (
    <Select.Async
      name={name}
      value={query}
      loadOptions={getOptions}
      onChange={parseValueToEvent}
    />
  )
}

export default withApollo(FilterForm)
