import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import * as Paths from '../../Paths'
import * as MobilizationActions from '../MobilizationActions'

const MobilizationCard = ({ mobilization, redirectToEdit, hasMouseOver, setMouseOver }) => {
  const editUrlIsFunction = redirectToEdit && typeof redirectToEdit === 'function'
  return (
    <Link
      to={editUrlIsFunction ? redirectToEdit(mobilization.id) : ''}
      disabled={editUrlIsFunction ? false : true}
      style={{textDecoration: 'none'}}
      onMouseOver={() => { setMouseOver(true) }}
      onMouseOut={() => { setMouseOver(false) }}
    >
      <div
        className="bg-white p2 border mb2 rounded"
        style={(hasMouseOver ? {borderColor: '#ccc'} : null)}
      >
        <h3 className="bold gray">{ mobilization.name }</h3>
        <p className="gray">{ mobilization.goal }</p>
      </div>
    </Link>
  )
}

MobilizationCard.propTypes = {
  mobilization: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    goal: PropTypes.string.isRequired
  }),
  hasMouseOver: PropTypes.bool.isRequired,
  redirectToEdit: PropTypes.func.isRequired,
  setMouseOver: PropTypes.func.isRequired
}
MobilizationCard.defaultProps = {
  hasMouseOver: false
}
const mapStateToProps = state => ({
  hasMouseOver: state.hasMouseOver
})

export default connect(mapStateToProps, MobilizationActions)(MobilizationCard)
