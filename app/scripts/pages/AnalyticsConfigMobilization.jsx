import React from 'react'
import { bindActionCreators } from 'redux'
import * as MobilizationActions from './../actions/MobilizationActions'
import { Link } from 'react-router'
import * as Paths from '../Paths'

export default class AnalyticsConfigMobilization extends React.Component {

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
    const { mobilization } = this.props
    return(
      <div className="flex-auto bg-silver gray">
        <h2 className="bg-white px3 m0 clearfix" style={{paddingTop: '2rem'}}>
          <div className="col col-4 mt0">Configure sua mobilização</div>
          <ul className="list-reset m0 col col-8" style={{marginTop: '-25px'}}>
            <li className="inline-block mr3">
              <Link to={Paths.basicsConfigMobilization(mobilization.id)} className="gray">1. Nome e objetivo</Link>
            </li>
            <li className="inline-block mr3">
              <Link to={Paths.cityConfigMobilization(mobilization.id)} className="gray">2. Cidade</Link>
            </li>
            <li className="inline-block py3 border-bottom" style={{borderWidth: '3px'}}>3. Google Analytics</li>
          </ul>
        </h2>
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
