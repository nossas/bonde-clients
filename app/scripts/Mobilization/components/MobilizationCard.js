import React, { PropTypes } from 'react'

import { Link } from 'react-router'

import * as Paths from '../../Paths'


class MobilizationCard extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = { hasMouseOver: false }
  }

  handleMouseOver() {
    this.setState({hasMouseOver: true})
  }

  handleMouseOut() {
    this.setState({hasMouseOver: false})
  }

  render() {
    const { mobilization, redirectToEdit } = this.props

    const editUrlIsFunction = redirectToEdit !== undefined && typeof redirectToEdit === 'function'

    return (
      <Link to={editUrlIsFunction ? redirectToEdit(mobilization.id) : ''} disabled={editUrlIsFunction ? false : true} style={{textDecoration: 'none'}} onMouseOver={::this.handleMouseOver} onMouseOut={::this.handleMouseOut}>
        <div className="bg-white p2 border mb2 rounded" style={(this.state.hasMouseOver ? {borderColor: '#ccc'} : null)}>
          <h3 className="bold gray">{ mobilization.name }</h3>
          <p className="gray">{ mobilization.goal }</p>
        </div>
      </Link>
    )
  }
}

MobilizationCard.propTypes = {
  mobilization: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    goal: PropTypes.string
  }),
  redirectToEdit: PropTypes.func
}

export default MobilizationCard
