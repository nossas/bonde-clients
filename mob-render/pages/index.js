import React from 'react'
import { connect } from 'react-redux'
import { ProviderStore } from '../components'
import { Mobilization, Reducer as MobilizationReducer } from '../webviewer/webviewer'
import styles from '../webviewer/main.3b3e3ca1d1b88a76b379.css'

class Page extends React.Component {
  
  componentDidMount () {
    if (!this.props.isLoaded) {
      this.props.fetchAll()
    }
  }

  render () {
    return this.props.mobilization ? (
      <div>
        <Mobilization editable={false} />
        <style global jsx>{styles}</style>
      </div>
    ) : (<h2>Loading...</h2>)
  }
}

const mapStateToProps = (state) => {
  const { mobilizations: { list: { currentId, data, isLoaded } } } = state
  if (currentId) {
    return {
      isLoaded: isLoaded,
      mobilization: data.filter(({ id }) => id === currentId)[0]
    }
  }
  return { isLoaded: isLoaded }
}

const mapActionsToProps = (dispatch, ownProps) => ({
  fetchAll: () => {
    const { headers, appDomain } = ownProps
    if (headers) {
      const { actions: MobilizationActions } = MobilizationReducer
      const host = headers['host']
      // eslint-disable-next-line
      const regex = host.match(`(.+)\.${appDomain}`)

      const where = regex
        ? { slug: regex[1].replace(/^www\./, '') }
        : { custom_domain: host }

      const promises = []
      promises.push(dispatch(MobilizationActions.asyncFilterMobilization(where)))
      promises.push(dispatch(MobilizationActions.asyncFilterBlock(where)))
      promises.push(dispatch(MobilizationActions.asyncFilterWidget(where)))
      Promise.all(promises)
    }
  }
})

export default ProviderStore(connect(mapStateToProps, mapActionsToProps)(Page))
