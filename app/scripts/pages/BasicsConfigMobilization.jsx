import React from 'react'
import { Link } from 'react-router'
import * as Paths from '../Paths'

export default class BasicsConfigMobilization extends React.Component {
  render(){
    const { mobilization } = this.props
    return(
      <div className="flex-auto bg-silver gray">
        <h2 className="bg-white px3 m0 clearfix" style={{paddingTop: '2rem'}}>
          <div className="col col-4 mt0">Configure sua mobilização</div>
          <ul className="list-reset m0 col col-8" style={{marginTop: '-25px'}}>
            <li className="inline-block py3 mr3 border-bottom" style={{borderWidth: '3px'}}>1. Nome e objetivo</li>
            <li className="inline-block mr3">
              <Link to={Paths.cityConfigMobilization(mobilization.id)} className="gray">2. Cidade</Link>
            </li>
            <li className="inline-block">
              <Link to={Paths.analyticsConfigMobilization(mobilization.id)} className="gray">3. Google Analytics</Link>
            </li>
          </ul>
        </h2>
        <div className="py3 px4">
        </div>
      </div>
    )
  }
}
