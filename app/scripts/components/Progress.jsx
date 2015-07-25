import React from 'react'
import classnames from 'classnames'

export default class Progress extends React.Component {
  render() {
    return(
      <div className={classnames('full-width', 'border')} >
        <div className={this.props.className} style={{width: `${this.props.percent}%`}} >
          <br />
        </div>
      </div>
    )
  }
}
