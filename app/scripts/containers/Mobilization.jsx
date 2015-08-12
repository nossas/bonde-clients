import React from 'react'
import MobilizationMenu from './../components/MobilizationMenu.jsx'
import { Loading } from './../components'
import * as MobilizationActions from './../actions/MobilizationActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

@connect(state => ({
  mobilizations: state.mobilizations
}))

export default class Mobilization extends React.Component {
  componentDidMount(){
    const { dispatch } = this.props
    const actions = bindActionCreators(MobilizationActions, dispatch)
    actions.fetchMobilizations()
  }

  render(){
    const ids = this.props.mobilizations.map((mobilization) => {return mobilization.id.toString()})
    const mobilization = this.props.mobilizations[ids.indexOf(this.props.params.mobilization_id)]
    return(mobilization ? this.renderMobilization(mobilization) : this.renderLoading())
  }

  renderMobilization(mobilization){
    return(
      <div className="flex flex-stretch">
        { this.props.sidebar ? React.cloneElement(this.props.sidebar, {...this.props, mobilization: mobilization}) : null }
        { React.cloneElement(this.props.main, {...this.props, mobilization: mobilization}) }
      </div>
    )
  }

  renderLoading(){
    return(
      <Loading />
    )
  }
}
