import React from 'react'
import { bindActionCreators } from 'redux'
import * as MobilizationActions from './../actions/MobilizationActions'

export default class ConfigMobilization extends React.Component {

  constructor(props, context){
    super(props, context)
    this.state = {
      google_analytics_code: props.mobilization.google_analytics_code,
      loading: false
    }

    const { dispatch } = this.props
    this.bindedBlockActions = bindActionCreators(MobilizationActions, dispatch)
  }

  handleGoogleAnalyticsCodeChange(e){
    this.setState({google_analytics_code: e.target.value})
  }

  handleFormSubmit(){
    event.preventDefault()
    const { mobilization } = this.props
    this.setState({loading: true})
    this.bindedBlockActions.editMobilization({
      id: mobilization.id,
      mobilization: {
        google_analytics_code: this.state.google_analytics_code
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.loading) {
      this.setState({loading: false})
    }
  }

  render(){
    return(
      <div className="flex-auto bg-silver gray">
        <h2 className="bg-white mt0 py3 px4">Configure sua mobilização</h2>
        <div className="py3 px4">
          <form onSubmit={::this.handleFormSubmit}>
            <div className="mb3">
              <label className="block h6 caps bold mb1">
                Código do Google Analytics
              </label>
              <input
                type="text"
                placeholder="UA-42446026-2"
                className="field-light"
                onChange={::this.handleGoogleAnalyticsCodeChange}
                value={this.state.google_analytics_code} />
            </div>
            <div>
              <button onClick={::this.handleFormSubmit} className="button bg-aqua">
                {this.state.loading ? <i className="fa fa-refresh fa-spin mr1" /> : null}
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
