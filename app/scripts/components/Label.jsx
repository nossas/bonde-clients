import React, {PropTypes} from 'react'

export default class Label extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    htmlFor: PropTypes.string
  }

  render() {
    const {text, htmlFor} = this.props

    return (
      <label
        style={{cursor: 'pointer'}}
        className="h5 bold caps"
        htmlFor={htmlFor}>
        {text}
      </label>
    )
  }
}
