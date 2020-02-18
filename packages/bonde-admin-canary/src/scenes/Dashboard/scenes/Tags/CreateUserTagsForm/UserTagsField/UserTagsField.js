import React from 'react'
import PropTypes from 'prop-types'
import { MultipleChoiceField, Tag, FullPageLoading } from 'bonde-styleguide'
import { Query } from 'react-apollo'
import UserTags from './userTags.graphql'

const UserTagsField = ({ t, ...props }) => (
  <Query query={UserTags}>
    {({ loading, error, data }) => {
      if (loading) {
        return (
          <FullPageLoading message={t('loading.userTags')} />
        )
      }

      const tags = data.tags.map(({ id, name, label }) => ({
        label,
        value: `${name}[${id}]`
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

UserTagsField.propTypes = {
  t: PropTypes.func
}

export default UserTagsField
