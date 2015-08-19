import React from 'react'
import { Link, Navigation } from 'react-router'
import * as Paths from '../Paths'
import classNames from 'classnames'

export default class ConfigurationsMenu extends React.Component {
  render(){
    const { mobilization, location } = this.props
    return(
      <div className="bg-white px3 clearfix">
        <h2 className="mb3">Configure sua mobilização</h2>
        <div>
          <ul className="list-reset mb0">
            <li className={
                classNames(
                  "inline-block",
                  "mr3",
                  "py2",
                  "h5",
                  {"border-bottom border-aqua bold": Paths.basicsMobilization(mobilization.id) == location.pathname}
                )
              }>
              <Link
                to={Paths.basicsMobilization(mobilization.id)}
                className="gray">
                Informações básicas
              </Link>
            </li>
            <li className={
                classNames(
                  "inline-block",
                  "mr3",
                  "py2",
                  "h5",
                  {"border-bottom border-aqua bold": Paths.cityMobilization(mobilization.id) == location.pathname}
                )
              }>
              <Link
                to={Paths.cityMobilization(mobilization.id)}
                className="gray">
                Cidade
              </Link>
            </li>
            <li className={
                classNames(
                  "inline-block",
                  "py2",
                  "h5",
                  {"border-bottom border-aqua bold": Paths.analyticsMobilization(mobilization.id) == location.pathname}
                )
              }>
              <Link
                to={Paths.analyticsMobilization(mobilization.id)}
                className="gray">
                Google Analytics
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
