import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { MobilizationCard } from './../components'
import * as Paths from '../Paths'

export default class ListMobilizations extends React.Component {
  static propTypes = {
    mobilizations: PropTypes.object.isRequired
  }

  render() {
    return (
      <div className="flex-auto bg-silver gray">
        <h2 className="bg-white mt0 py3 px4 clearfix align-middle">
          <div className="left" style={{marginTop: '12px'}}>
            <i className="fa fa-flag-o mr2 aqua" />
            Suas mobilizações
          </div>
          <Link
            to={Paths.newMobilization()}
            className="button bg-aqua caps h4 py2 right">
            <i className="fa fa-plus mr2" />
            Nova mobilização
          </Link>
        </h2>
        <div className="col-6 mx-auto py3 px4">
          {
            this.props.mobilizations.data.map((m) => {
              return (
                <MobilizationCard
                  {...this.props}
                  key={'mobilization-' + m.id}
                  mobilization={m}
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}
