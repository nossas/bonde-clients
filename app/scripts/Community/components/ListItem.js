import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { select } from '../actions'


const ListItem = props => {

  const { select, community: { id, name } } = props
  return (
    <div className="ListItem" onClick={() => select(id)} style={{ cursor: "pointer" }}>
      <img className="left mr2" role="presentation" src="" title={name} />
      <p>
        <span>{name}</span>
        <i className="fa fa-arrow-right gray right" aria-hidden="true" />
      </p>
    </div>
  )
}

ListItem.propTypes = {
  community: PropTypes.object.isRequired,
}

export default connect(null, { select })(ListItem)
