import React from 'react'
import { connect } from 'react-redux'
import { graphql, gql } from 'react-apollo'
import uuidv4 from 'uuid/v4'

import * as CommunitySelectors from '~client/community/selectors'

const mapStateToProps = (state) => ({
  communityId: CommunitySelectors.getCurrentId(state)
})

const createActivistMutation = gql`
  mutation createActivist($activist: Json!) {
    createActivist(input: {
      activist: $activist
    }) {
      json
    }
  }
`

class SimpleImportCSV extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      activists: [],
      elementId: uuidv4()
    }
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
        this.insertActivists(activists)
      })
      reader.readAsText(file)
    }
  }

  insertActivists (activists) {
    const { communityId } = this.props
    activists.forEach(activist => {
      this.props.mutate({
        variables: {
          activist: JSON.stringify({
            ...activist,
            community_id: communityId
          })
        }})
        .then(({ data: { createActivist } }) => {
          console.log(`Created activist with id (${JSON.parse(createActivist.json).id})`)
        })
    })
  }

  clickInput () {
    const element = document.getElementById(this.state.elementId)
    element.value = ''
    element.click()
  }

  render () {
    return (
      <div>
        <input
          id={this.state.elementId}
          type='file'
          accept='.csv'
          multiple={false}
          onChange={this.onChange.bind(this)}
          style={{ position: 'fixed', width: '0px', opacity: '0' }}
        />
        <div onClick={this.clickInput.bind(this)}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(
  graphql(createActivistMutation)(SimpleImportCSV)
)
