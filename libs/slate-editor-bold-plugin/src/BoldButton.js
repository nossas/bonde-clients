/* eslint-disable react/prop-types */
import React from 'react'
import FontAwesome from 'react-fontawesome'
import classnames from 'classnames'

import { Button } from '@slate-editor/components'
import { boldMarkStrategy, hasMark } from './BoldUtils'


const BoldButton = ({ value, onChange, className, style, type }) => (
  <Button
    style={style}
    type={type}
    onClick={() => onChange(boldMarkStrategy(value.change()))}
    className={classnames(
      'slate-bold-plugin--button',
      { active: hasMark(value) },
      className,
    )}
  >
    <FontAwesome name="bold" />
  </Button>
)

export default BoldButton
