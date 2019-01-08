import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

// Global module dependencies
// TODO: Remove this global dependencies
import * as paths from '@/paths'
import { TellAFriend } from '@/components/share'

const FormTellAFriend = ({ preview, mobilization, widget }) => (
  <TellAFriend
    preview={preview}
    mobilization={mobilization}
    widget={widget}
    message={
      <FormattedMessage
        id='form-widget.components--tell-a-friend.message'
        defaultMessage='Formulário submetido com sucesso!'
      />
    }
    href={paths.mobilization(mobilization)}
  />
)

FormTellAFriend.propTypes = {
  preview: PropTypes.bool,
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired
}

export default FormTellAFriend
