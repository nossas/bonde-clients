import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { NewMobilizationHeader } from '../components'
import { getMobilization } from '../MobilizationSelectors'


class NewMobilization extends Component {

  render() {
    const { children, ...otherProps } = this.props
    return (
      <div className="flex-auto bg-silver gray">
        <NewMobilizationHeader location={otherProps.location} />
        {
          React.cloneElement(children, {...otherProps})
        }
      </div>
    )
  }
}

NewMobilization.propTypes = {
  mobilization: PropTypes.object,
  saving: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  })
}

const mapStateToProps = (globalState, ownProps) => {
  return {
    saving: globalState.mobilization.saving,
    mobilization: getMobilization(globalState, ownProps)
  }
}

export default connect(mapStateToProps)(NewMobilization)
