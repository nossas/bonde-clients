import React from 'react'

class Block extends React.Component {
  
  getBgStyle () {
    const { bg_image: bgImage, bg_class: bgClass } = this.props.block

    if (bgImage) {
      return {
        background: `url('${bgImage}') no-repeat`,
        backgroundSize: 'cover'
      }
    } else if (bgClass) {
      try {
        const { r, g, b, a } = JSON.parse(bgClass)
        return { backgroundColor: `rgba(${r},${g},${b},${a})` }
      } catch (ex) {
        // Silent error because use className
      }
    }
  }

  render () {
    const { children, block: { id, bg_class: bgClass } } = this.props
    
    const bgClassName = bgClass && bgClass.indexOf('{') === -1
      ? bgClass : undefined
    
    return (
      <div
        id={`block-${id}`}
        className={bgClassName}
        style={this.getBgStyle()}
      >
        {children}
      </div>
    )
  }
}

Block.defaultProps = {
  block: {}
}

export default Block
