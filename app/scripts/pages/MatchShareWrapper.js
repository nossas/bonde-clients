import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import DocumentMeta from 'react-document-meta'
import { showMatch } from './../reducers/matches'

const mapStateToProps = state => ({ matches: state.matches })

export class MatchShareWrapper extends React.Component {
  static propTypes = {
    matches: PropTypes.object,
    params: PropTypes.object
  }

  static fetchData(store, params) {
    const action = showMatch(params)
    const promise = store.dispatch(action)
    return Promise.all([promise])
  }

  metaData(props = this.props) {
    const { matches: { data } } = props
    return { meta: { name: {
      'og:title': `${data.first_choice} + ${data.second_choice}`,
      'og:description': 'Subtítulo deve ser configurável.',
      'og:image': data.goal_image
    }}}
  }

  render() {
    return <DocumentMeta { ...this.metaData() } />
  }
}

export default connect(mapStateToProps)(MatchShareWrapper)
