import React, { PropTypes } from 'react'

import Tag from './Tag'


const BlockTag = (props) => {

  const { tags, ...otherProps } = props

  return (
    <div className="mb1 flex flex-wrap">
      {tags.map(tag => <Tag value={tag} {...otherProps} />)}
    </div>
  )
}

BlockTag.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
  onRemove: PropTypes.func
}

BlockTag.defaultProps = {
  tags: [],
}

export default BlockTag
