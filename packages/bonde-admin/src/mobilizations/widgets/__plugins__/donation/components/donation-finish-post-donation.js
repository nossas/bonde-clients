import React from 'react'
import { bool, object } from 'prop-types'

import * as paths from 'paths'
import { FinishPostDonation } from 'components/post-donation'

const DonationFinishPostDonation = ({ preview, mobilization, widget }) => {
  return (
    <FinishPostDonation
      preview={preview}
      mobilization={mobilization}
      widget={widget}
      href={paths.mobilization(mobilization)}
    />
  )
}

DonationFinishPostDonation.propTypes = {
  preview: bool,
  mobilization: object,
  widget: object
}

export default DonationFinishPostDonation
