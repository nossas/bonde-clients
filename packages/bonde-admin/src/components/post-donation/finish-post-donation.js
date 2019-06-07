import { bool, string, object, oneOf } from 'prop-types'
import React from 'react'

import TellAFriendBase from 'bonde-webpage/lib/ux/'

const FinishPostDonation = ({
  preview,
  href,
  mobilization,
  widget
}) => {
  console.log('preview', preview)
  console.log('href', href)
  console.log('mobilization', mobilization)
  console.log('widget', widget)

  return (
    <div className='center p3 darkengray rounded'>
      teste
    </div>
  )
}

FinishPostDonation.propTypes = {
  preview: bool,
  widget: object,
  mobilization: object,
  href: string,
}

export default FinishPostDonation
