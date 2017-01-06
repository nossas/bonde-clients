import React, { PropTypes } from 'react'
import DocumentMeta from 'react-document-meta'
import { connect } from 'react-redux'

import { actions as WidgetsMatchActions } from '../../../../../modules/widgets/__plugins__/match'

export class ShareContainer extends React.Component {
  static fetchData (store, params) {
    const action = WidgetsMatchActions.asyncMatchShow(params)
    const promise = store.dispatch(action)
    return Promise.all([promise])
  }

  metaData (props = this.props) {
    const { matches: { data } } = props
    return { meta: { name: {
      'og:title': `${data.first_choice} + ${data.second_choice}`,
      'og:description': data.widget_title,
      'og:image': data.goal_image
    }}}
  }

  render () {
    return <DocumentMeta {...this.metaData()} />
  }
}

ShareContainer.propTypes = {
  matches: PropTypes.object,
  params: PropTypes.object
}

const mapStateToProps = state => ({ matches: state.matches })

export default connect(mapStateToProps)(ShareContainer)
