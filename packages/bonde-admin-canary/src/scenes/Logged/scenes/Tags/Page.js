import React from 'react'
import {
  Button,
  Flexbox2 as Flexbox,
  Icon,
  Title
} from 'bonde-styleguide'
import { Redirect } from 'services/router'
import { CURRENT_USER_QUERY, auth } from 'services/auth'
import { translate } from 'services/i18n'
import { FormGraphQL, Field } from 'components/Form'
import { TagsField } from './components'
import CREATE_USER_TAGS from './createUserTags.graphql'

class AuthTags extends React.Component {
  state = { redir: false }

  render () {
    const { t, user } = this.props

    if (this.state.redir) return <Redirect to='/admin' />

    return (
      <Flexbox vertical middle padding='0 26.6%'>
        <Title.H2 margin={{ bottom: 25 }} fontSize={44}>
          {`${t('greetings')}, ${user.firstName}!`}
        </Title.H2>

        <Title.H4 margin={{ bottom: 60 }} fontWeight='normal' align='center'>
          {t('explanation')}
        </Title.H4>

        <FormGraphQL
          initialValues={{ tags: user.tags.join(';') }}
          mutation={CREATE_USER_TAGS}
          update={(cache, { data: { createUserTags } }) => {
            if (createUserTags && createUserTags.json) {
              const { currentUser } = cache.readQuery({ query: CURRENT_USER_QUERY })
	      cache.writeQuery({
	        query: CURRENT_USER_QUERY,
	        data: {
                  currentUser: {
                    ...currentUser,
                    tags: createUserTags.json
                  }
                }
	      })
            }
	  }}
          onSubmit={({ tags }, mutation) => {
            const jsonTags = JSON.stringify({
              tags: tags.split(';')
            })
            return mutation({ variables: { data: jsonTags } })
            .then(() => {
              this.setState({ redir: true })
            })
          }}
        >
          
          <Field name='tags' component={TagsField} />

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
      </Flexbox>
    )
  }
}

export default translate('tags')(auth()(AuthTags))
