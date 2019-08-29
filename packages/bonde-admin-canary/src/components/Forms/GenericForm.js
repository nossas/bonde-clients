import React from 'react'
import PropTypes from 'prop-types'
import { Flexbox2 as Flexbox, InputHint } from 'bonde-styleguide'

/**
  * GenericForm
  *
  * Render a form and a form error component
  */
const GenericForm = (props) => {
  return (
    <form style={{ width: '100%' }} onSubmit={props.handleSubmit}>
      <Flexbox horizontal end>
        {props.error && <InputHint invalid>{props.error}</InputHint>}
      </Flexbox>
      {props.children}
    </form>
  )
}

const { node, any, func } = PropTypes

GenericForm.propTypes = {
  children: node,
  error: any,
  handleSubmit: func
}

export default GenericForm
