import React from 'react'
import { Flexbox2 as Flexbox, Title, Spacing } from 'bonde-styleguide'
import { toast } from 'react-toastify'
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
      <Spacing style={{ height: '100%' }} padding={{ x: '10%', y: 0 }}>
        <Flexbox vertical middle>
          <Spacing margin={{ bottom: 30 }}>
            <Title.H2 margin={{ bottom: 25 }} fontSize={44} align='center'>
              {`${t('greetings')}, ${user.firstName}!`}
            </Title.H2>
            <Title.H4 margin={{ bottom: 60 }} fontWeight='normal' align='center'>
              {t('explanation')}
            </Title.H4>
          </Spacing>
          <CreateUserTagsForm
            onSuccess={() => {
              toast('Salvo com sucesso!', { type: toast.TYPE.SUCCESS })
              this.setState({ redirect: true })
            }}
          />
        </Flexbox>
      </Spacing>
    )
  }
}

Tags.propTypes = {
  t: PropTypes.func,
  user: PropTypes.any
}

export default Tags
