import React from 'react'
import { Button, Icon, Flexbox2 as Flexbox } from 'bonde-styleguide'
import { Field, FormGraphQL } from 'components/Form'
import UserTagsField from './UserTagsField'
import CreateUserTags from './createUserTags.graphql'
import updateCurrentUserTags from './updateCurrentUserTags'

const CreateUserTagsForm = ({ t, user }) => {
  return (
    <FormGraphQL
      initialValues={{ tags: user.tags.join(';') }}
      mutation={CreateUserTags}
      update={updateCurrentUserTags}
      onSubmit={({ tags }, mutation) => {
        const jsonTags = JSON.stringify({
          tags: tags.split(';')
        })
        return mutation({ variables: { data: jsonTags } })
      }}
    >
      <Field name='tags' component={UserTagsField} />

      <Flexbox horizontal spacing='between' margin={{ top: 55 }}>
        <Button flat title={t('buttons.addTag')}>
          <Icon name='plus' size={7} />
          {t('buttons.addTag')}
        </Button>
        <Button
          type='submit'
          title={t('buttons.submit')}
        >
          {t('buttons.submit')}
        </Button>
      </Flexbox>
    </FormGraphQL>
  )
}

export default CreateUserTagsForm
