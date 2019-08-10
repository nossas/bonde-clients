import React from 'react'
import { Flexbox2 as Flexbox, Title } from 'bonde-styleguide'
import { Redirect } from 'services/router'
import CreateUserTagsForm from './CreateUserTagsForm'
import PropTypes from 'prop-types'

class Tags extends React.Component {
  constructor (props) {
    super(props)
    this.state = { redirect: props.user.tags && props.user.tags.length > 0 }
  }

  render () {
    const { t, user } = this.props

    if (this.state.redirect) return <Redirect to='/admin' />

    return (
      <Flexbox vertical middle padding='0 26.6%'>
        <Title.H2 margin={{ bottom: 25 }} fontSize={44}>
          {`${t('greetings')}, ${user.firstName}!`}
        </Title.H2>

        <Title.H4 margin={{ bottom: 60 }} fontWeight='normal' align='center'>
          {t('explanation')}
        </Title.H4>

        <CreateUserTagsForm
          onSuccess={() => {
            this.setState({ redirect: true })
          }}
        />
      </Flexbox>
    )
  }
}

Tags.propTypes = {
  t: PropTypes.func,
  user: PropTypes.any
}

export default Tags
