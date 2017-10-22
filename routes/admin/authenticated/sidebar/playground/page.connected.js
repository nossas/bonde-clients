import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { graphql, gql } from 'react-apollo'

import { required, validateEmail, validate } from '~client/utils/validate'
import * as CommunitySelectors from '~client/community/selectors'
import {
 FormRedux,
 FormGroup,
 ControlLabel,
 FormControl
} from '~client/components/forms'

const CreateActivist = ({ communityId, create, fields: { name, email }, ...formProps }) => (
  <FormRedux {...formProps} onSubmit={create}>
    <FormGroup {...name}>
      <ControlLabel>Name</ControlLabel>
      <FormControl type='text' />
    </FormGroup>
    <FormGroup {...email}>
      <ControlLabel>Email</ControlLabel>
      <FormControl type='text' />
    </FormGroup>
  </FormRedux>
)

const mapStateToProps = (state) => ({
  communityId: CommunitySelectors.getCurrentId(state)
})

const mapActionsToProps = (dispatch, props) => ({
  ...props,
  create: values => {
    props.mutate({
      variables: {
        activist: JSON.stringify({
          ...values,
          community_id: props.communityId
        })
      }})
      .then(({ data: { createActivist } }) => {
        console.log(`Created activist with id (${JSON.parse(createActivist.json).id})`)
      })
  },
})

const fields = ['name', 'email']

const createActivistMutation = gql`
  mutation createActivist($activist: Json!) {
    createActivist(input: {
      activist: $activist
    }) {
      json
    }
  }
`

const CreateActivistForm = graphql(createActivistMutation)(
  connect(null, mapActionsToProps)(
    reduxForm({
      form: 'activistForm',
      fields,
      validate: validate([
        required(['name', 'email']),
        validateEmail(['email'])
      ])
    })(CreateActivist)
  )
)

const Page = ({ communityId }) => (
  <div style={{ marginLeft: '20px' }}>
    <h1>{`Insert activit in community (${communityId})`}</h1>
    <CreateActivistForm communityId={communityId} />
  </div>
)

export default connect(mapStateToProps)(Page)
