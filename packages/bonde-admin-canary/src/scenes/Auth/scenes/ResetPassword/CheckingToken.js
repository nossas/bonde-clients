import React from 'react'
import PropTypes from 'prop-types'
import { TextLoading } from 'bonde-styleguide'

const CheckingToken = ({ t }) => (
  <TextLoading
    message={t('resetPassword.checkingToken')}
  />
)

CheckingToken.propTypes = {
  t: PropTypes.func
}

export default CheckingToken
