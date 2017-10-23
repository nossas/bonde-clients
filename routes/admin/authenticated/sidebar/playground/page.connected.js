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

class Page extends React.Component {

  constructor (props) {
    super(props)
    this.state = { activists: [] }
  }

  onChange (evt) {
    const file = evt.target.files[0]
    if (file) { 
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        // Split CSV in rows, check if row is empty
        const isEmpty = line => line.length === 0 || !line.trim()
        const lines = reader
          .result
          .split(/\r\n|\n/)
          .filter(line => !isEmpty(line))
        // Get header and mount activist fields
        const header = lines[0].split(';')
        const activists = lines.slice(1).map(row => {
          const columns = row.split(';').map((col, i) => ({
            [header[i]]: col
          }))
          const activist = {}
          columns.forEach((col) => {
            activist[Object.keys(col)[0]] = Object.values(col)[0]
          })
          return activist
        })
        // Callback with result of parse
        this.setState({ activists })
      })
      reader.readAsText(file)
    }
  }

  handleClick () {
    
  }

  render () {
  
    const { communityId } = this.props 

    return (
      <div style={{ marginLeft: '20px' }}>
        <h1>{`Insert activit in community (${communityId})`}</h1>
        <div style={{ backgroundColor: '#c7c7c7', width: '200px' }}>
          <input type='file' onChange={this.onChange.bind(this)} />
        </div>
        <div>
          <ul>
            {this.state.activists.map((activist) => (
              <li key={activist.name}>{`${activist.name}(${activist.email})`}</li>
            ))}
          </ul>
          <button onClick={this.handleClick.bind(this)}>Export CSV</button>
        </div>
        <CreateActivistForm communityId={communityId} />
      </div>
    )
  }
}

export default connect(mapStateToProps)(Page)
