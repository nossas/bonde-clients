import React from 'react'

export default class Loading extends React.Component {
  render() {
    return (
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-darken-4 flex flex-center z4">
        <div className="mx-auto">
          <i className="fa fa-circle-o-notch fa-spin fa-3x fa-w white" />
        </div>
      </div>
    )
  }
}
