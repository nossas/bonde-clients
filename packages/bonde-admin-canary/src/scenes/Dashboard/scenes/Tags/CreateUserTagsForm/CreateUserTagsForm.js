import React from 'react'
import { Flexbox2 as Flexbox } from 'bonde-styleguide'
import { MutationForm, Field, SubmitButton } from 'components/Forms'
import { CURRENT_USER_QUERY } from 'services/auth'
import UserTagsField from './UserTagsField'
import CreateUserTags from './createUserTags.graphql'
import updateCurrentUserTags from './updateCurrentUserTags'
import PropTypes from 'prop-types'

const formName = 'CreateUserTagsForm'

const CreateUserTagsForm = ({ t, user, onSuccess }) => {
  return (
    <MutationForm
      fluid
      formId={formName}
      values={{ tags: user.tags.join(';') }}
      mutation={CreateUserTags}
      parse={({ tags }) => {
        const regexp = /\[+(\d+)\]$/
        const input = tags.split(';')
          .map(tag => regexp.exec(tag)[1])
          .map(tagId => ({ tag_id: Number(tagId) }))
        return { tags: input }
      }}
      updateQuery={updateCurrentUserTags}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      onSuccess={onSuccess}
    >
      <Field name='tags' component={UserTagsField} />

      <Flexbox horizontal end margin={{ top: 55 }}>
        <SubmitButton title={t('buttons.submit')} formId={formName}>
          {t('buttons.submit')}
        </SubmitButton>
      </Flexbox>
    </MutationForm>
  )
}

CreateUserTagsForm.propTypes = {
  t: PropTypes.func,
  user: PropTypes.any,
  onSuccess: PropTypes.func
}

export default CreateUserTagsForm
