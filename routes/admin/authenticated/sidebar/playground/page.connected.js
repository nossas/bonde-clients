import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { graphql, gql } from 'react-apollo'
import ReactFileReader from 'react-file-reader'

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

  parseCSV (csv) {
    const allTextLines = csv.split(/\r\n|\n/)
    const activists = allTextLines.map(row => {
      const data = row.split(';')
      return {
        name: data[0],
        email: data[1]
      }
    })
    this.setState({ activists })
    return activists
  }

  onChange (files) {
    const reader = new FileReader()
    reader.onload = () => this.parseCSV(reader.result)
    reader.readAsText(files.fileList[0])
  }

  render () {
  
    const { communityId } = this.props 

    return (
      <div style={{ marginLeft: '20px' }}>
        <h1>{`Insert activit in community (${communityId})`}</h1>
        <div style={{ backgroundColor: '#c7c7c7', width: '200px' }}>
          <ReactFileReader base64={true} multipleFiles={false} handleFiles={this.onChange.bind(this)}>
            <button>Upload!</button>
          </ReactFileReader>
        </div>
        <div>
          <ul>
            {this.state.activists.map((activist) => (
              <li key={activist.name}>{`${activist.name}(${activist.email})`}</li>
            ))}
          </ul>
        </div>
        <CreateActivistForm communityId={communityId} />
      </div>
    )
  }
}

export default connect(mapStateToProps)(Page)
