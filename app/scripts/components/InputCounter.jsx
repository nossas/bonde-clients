import React, {PropTypes} from 'react'
import classnames from 'classnames'

export default class InputCounter extends React.Component {
  static propTypes = {
    maxLength: PropTypes.number.isRequired,
    length: PropTypes.number,
    classNames: PropTypes.array
  }

  render() {
    const {maxLength, length, classNames} = this.props
    const dif = maxLength - length

    return (
      <span className={classnames(classNames, {red: dif < 11})}>{ dif }</span>
    )
  }
}
