import React from 'react'
import { MobilizationBasicsForm } from './../components'

export default class NewMobilization extends React.Component {
  render(){
    return(
      <div className="flex-auto bg-silver gray">
        <h2 className="bg-white px4 m0 clearfix" style={{paddingTop: '2rem'}}>
          <div className="col col-4 mt0">Nova mobilização</div>
          <ul className="list-reset m0 col col-8" style={{marginTop: '-25px'}}>
            <li className="inline-block py3 mr3 border-bottom" style={{borderWidth: '3px'}}>1. Nome e objetivo</li>
            <li className="inline-block muted">2. Cidade</li>
          </ul>
        </h2>
        <div className="p3">
          <h3 className="h2 mt0 mb3 center">Conte um pouco sobre sua mobilização</h3>
          <MobilizationBasicsForm {...this.props} />
        </div>
      </div>
    )
  }
}
