import React from 'react'
import { MultipleChoiceField, Tag } from 'bonde-styleguide'
import { Query } from 'react-apollo'
import { LoadingFullScreen } from 'components/Loadable'
import UserTags from './userTags.graphql'

export default ({ t, ...props }) => (
  <Query query={UserTags}>
    {({ loading, error, data }) => {

      if (loading) {
        return (
          <LoadingFullScreen message={t('loading.userTags')} />
        )
      }

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
