import React, { PropTypes } from 'react'
import classnames from 'classnames'

import { FormRedux } from '~client/components/forms'
import { Button } from '~client/ux/components'

if (require('exenv').canUseDOM) {
  require('./flat-form.scss')
  require('./button.scss')
}

const FlatForm = ({ formClassNames, children, titleText, buttonText, ...formProps }) => (
  <FormRedux
    {...formProps}
    nosubmit
    className={classnames('ux--flat-form', formClassNames)}
  >
    <h2 className='center bold m0 pb1'>
      {titleText}
    </h2>
    {children}
    <Button type='submit'>{buttonText}</Button>
  </FormRedux>
)

FlatForm.propTypes = {
  formProps: PropTypes.object.isRequired,
  formClassNames: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  children: PropTypes.node.isRequired,
  buttonText: PropTypes.string.isRequired,
  titleText: PropTypes.string.isRequired
}

export default FlatForm
