import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as Paths from '../../Paths'
import * as WidgetSelectors from '../WidgetSelectors'

import { CloseButton } from '../../components'


export class Settings extends Component {

  render() {
    const { children, ...otherProps } = this.props

    return (
      <div className="flex-auto flex flex-column bg-silver gray relative">
        {children && React.cloneElement(children, {...otherProps})}
        <CloseButton
          dirty={false}
          path={Paths.editMobilization(this.props.mobilization.id)} />
      </div>
    )
  }
}


Settings.propTypes = {
  children: PropTypes.object,
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
}

const mapStateToProps = (globalState, ownProps) => {
  return {
    widget: WidgetSelectors.getWidget(globalState, ownProps),
  }
}

export default connect(mapStateToProps)(Settings)
