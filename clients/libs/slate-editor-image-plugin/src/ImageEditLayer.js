/* eslint-disable no-undef */
import React from 'react'
import { Button } from '@slate-editor/components'

// FIXME: Needs to handle assets files to work with SSR
// eslint-disable-next-line @typescript-eslint/no-var-requires
if (require('exenv').canUseDOM) require('./ImageEditLayer.module.css')

// eslint-disable-next-line react/prop-types
const ImageEditLayer = ({ changeModalState, text }) => {
  return changeModalState ? (
    <div className="image-node--image-edit-layer" onClick={() => changeModalState(true)}>
      <Button className="image-node--image-edit-button" onClick={() => changeModalState(true)}>
        {text}
      </Button>
    </div>
  ) : (
    <div className="image-node--image-edit-layer" style={{backgroundColor: 'rgba(255,255,255,.9)'}}>
      <p className="image-node--image-edit-text">{text}</p>
    </div>
  )
}

export default ImageEditLayer
