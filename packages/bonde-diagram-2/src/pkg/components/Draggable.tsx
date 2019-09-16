import * as React from 'react'
import DiagramContext from '../Context'

export interface DraggrableProps {
  children: any | string,
  className?: string,
  kind: string
}

class Draggrable extends React.Component<DraggrableProps> {
  static contextType = DiagramContext

  render () {
    const { children, className, kind } = this.props
    const { transferKey } = this.context

    return (
      <div
        draggable
        className={className}
        onDragStart={(evt) => {
          evt
            .dataTransfer
            .setData(transferKey, kind)
        }}
      >
        {children}
      </div>
    )
  }
}

export default Draggrable