import React from 'react'
import { MultipleChoiceField, Tag } from 'bonde-styleguide'
import { Query } from 'react-apollo'
import { LoadingFullScreen } from 'components/Loadable'
import TAGS from './tags.graphql'


const TagsField = (props) => (
  <Query query={TAGS} variables={{ tagType: 'user' }}>
    {({ loading, error, data }) => {

      if (loading) return <LoadingFullScreen message='Carregando tags.' />

      if (error) console.log('error', error)
      
      const tags = data.allTags.nodes.map(({ name, label }) => ({
        label,
        value: name
      }))

      return (
        <MultipleChoiceField
          options={tags}
          inputComponent={Tag}
          {...props}
        />
      )
    }}
  </Query>
)

export default TagsField
