import React, { PropTypes } from 'react'
import classnames from 'classnames'

const Choices = ({ options=[], selected, onSelected }) => {
  return (
    <ul className={classnames('choices', { 'disabled': !!selected })}>
      {options.map(option => {
        return <li 
          className={classnames({ 'selected': selected === option })}
          onClick={() => onSelected(option)}>
          {option}
        </li>
      })}
    </ul>
  )
}

Choices.propTypes = {
  options: PropTypes.array,
  selected: PropTypes.string,
  onSelected: PropTypes.func.isRequired
}

export default Choices
