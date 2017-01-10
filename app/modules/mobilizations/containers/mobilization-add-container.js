import React from 'react'
import classnames from 'classnames'
import * as Paths from '../../../scripts/Paths'

import '../assets/scss/mobilization-add.scss'


export default ({ children, location }) => {

  const activeClass = 'bold black'
  const goalIsActive = location && location.pathname === Paths.newMobilization()
  const templateIsActive = location && /\/\w+\/[0-9]+\/templates\/choose/.test(location.pathname)

  return (
    <div className='flex-auto bg-silver gray'>
      <div className='new-mobilization-header bg-white pr4 pl3 pt3 pb1 clearfix'>
        <h1 className='h1 mt0'>Nova mobilização</h1>
        <ul className='list-reset m0 lightgray block'>
          <li className={classnames('inline-block mr2', goalIsActive ? activeClass : null)}>
            <i className={classnames('circle center inline-block mr2', goalIsActive ? 'bg-pagenta' : 'bg-gray94')}>1</i>
            Objetivo
          </li>
          <li className={classnames('inline-block mr2', templateIsActive ? activeClass : null)}>
            <i className={classnames('circle center inline-block mr2', templateIsActive ? 'bg-pagenta' : 'bg-gray94')}>2</i>
            Templates
          </li>
        </ul>
      </div>
      <div className="clearfix overflow-auto">
        <div className="p3 lg-col-5 mx-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
