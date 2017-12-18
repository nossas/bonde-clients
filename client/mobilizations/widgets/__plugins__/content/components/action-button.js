import React from 'react'
import classnames from 'classnames'

const ActionButton = ({ children, editing, onChange, onClick, title, style, className, state }) => (
  <button
    className={classnames('btn bg-blacker rounded', className)}
    onClick={() => onClick(state, onChange)}
    style={{
      position: 'relative',
      display: editing ? 'inline-block' : 'none',
      ...style
    }}
    title={title}
  >
    {children}
  </button>
)

export default ActionButton
