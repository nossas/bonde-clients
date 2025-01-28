/* eslint-disable no-undef */
import React from 'react'

import { GridButton, GridSplitRowButton } from './'
// FIXME: Needs to handle assets files to work with SSR
// eslint-disable-next-line @typescript-eslint/no-var-requires
if (require('exenv').canUseDOM) require('./GridButtonBar.module.css')


const GridButtonBar = props => (
  <div className='slate-grid-plugin--button-bar'>
    <GridButton {...props} />
    <GridSplitRowButton {...props} />
  </div>
)

export default GridButtonBar
