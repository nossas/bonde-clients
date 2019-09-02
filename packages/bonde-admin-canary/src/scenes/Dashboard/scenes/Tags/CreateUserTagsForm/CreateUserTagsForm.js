import React from 'react'
import { Button, Flexbox2 as Flexbox } from 'bonde-styleguide'
import { Field, FormGraphQL } from 'components/Form'
import { CURRENT_USER_QUERY } from 'services/auth'
import UserTagsField from './UserTagsField'
import CreateUserTags from './createUserTags.graphql'
import updateCurrentUserTags from './updateCurrentUserTags'
import PropTypes from 'prop-types'

const formName = 'CreateUserTagsForm'

const CreateUserTagsForm = ({ t, user, onSuccess }) => {
  return (
    <FormGraphQL
      name={formName}
      initialValues={{ tags: user.tags.join(';') }}
      mutation={CreateUserTags}
      update={updateCurrentUserTags}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      onSubmit={({ tags }, mutation) => {
        const jsonTags = JSON.stringify({
          tags: tags.split(';')
        })
        return mutation({ variables: { data: jsonTags } })
          .then(onSuccess)
      }}
    >
      <Field name='tags' component={UserTagsField} />

      <Flexbox horizontal end margin={{ top: 55 }}>
        <Button
          type='submit'
          title={t('buttons.submit')}
          formName={formName}
        >
          {t('buttons.submit')}
        </Button>
      </Flexbox>
    </FormGraphQL>
  )
}

CreateUserTagsForm.propTypes = {
  t: PropTypes.func,
  user: PropTypes.any,
  onSuccess: PropTypes.func
}

export default CreateUserTagsForm
