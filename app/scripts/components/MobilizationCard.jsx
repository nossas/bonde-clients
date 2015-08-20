import React from 'react'
import { Link } from 'react-router'
import * as Paths from '../Paths'

export default class MobilizationCard extends React.Component {
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
    const { mobilization } = this.props
    return(
      <Link to={Paths.editMobilization(mobilization.id)} style={{textDecoration: 'none'}} onMouseOver={::this.handleMouseOver} onMouseOut={::this.handleMouseOut}>
        <div className="bg-white p2 border mb2 rounded" style={(this.state.hasMouseOver ? {borderColor: '#ccc'} : null)}>
          <h3 className="bold gray">{ mobilization.name }</h3>
          <p className="gray">{ mobilization.goal }</p>
        </div>
      </Link>
    )
  }
}
