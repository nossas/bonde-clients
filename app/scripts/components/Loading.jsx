import React from 'react'

export default class Loading extends React.Component {
  render() {
    return(
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-darken-4 flex flex-center">
        <div className="mx-auto" style={{zIndex: 9999}}>
          <i className="fa fa-refresh fa-spin fa-3x fa-w white" />
        </div>
      </div>
    )
  }
}
