/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react'

// FIXME: Needs to handle assets files to work with SSR
// eslint-disable-next-line @typescript-eslint/no-var-requires
if (require('exenv').canUseDOM) require('./ModalContent.module.css')

const ModalContent = ({ children }) => (
  <div className="modal--content">
    {children}
  </div>
)

// eslint-disable-next-line react/display-name
ModalContent.Left = ({ children }) => (
  <div className="modal--content-left">
    {children}
  </div>
)

// eslint-disable-next-line react/display-name
ModalContent.Right = ({ children }) => (
  <div className="modal--content-right">
    {children}
  </div>
)

export default ModalContent
