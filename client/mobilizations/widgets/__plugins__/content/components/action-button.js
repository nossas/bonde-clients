import React from 'react'
import classnames from 'classnames'

const ActionButton = ({ children, editing, setState, onClick, style, className }) => (
  <button
    className={classnames('btn bg-blacker rounded', className)}
    onClick={onClick}
    style={{
      position: 'relative',
      zIndex: editing ? 4 : 'inherit',
      display: editing ? 'inline-block' : 'none',
      ...style
    }}
  >
    {children}
  </button>
)

export default ActionButton
