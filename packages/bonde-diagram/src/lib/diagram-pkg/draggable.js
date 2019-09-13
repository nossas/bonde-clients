import React from 'react'
import DiagramContext from './context'

class Draggrable extends React.Component {
  static contextType = DiagramContext

  render () {
    const { children, className, data } = this.props
    const { transferKey } = this.context

    return (
      <div
        draggable
        className={className}
        onDragStart={(evt) => {
          evt
            .dataTransfer
            .setData(transferKey, JSON.stringify(data))
        }}
      >
        {children}
      </div>
    )
  }
}

export default Draggrable