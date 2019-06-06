import React from 'react'
import { bool, object } from 'prop-types'

import { FinishPostDonation } from 'bonde-webpage/lib/plugins/donation/components'

console.log(FinishPostDonation)

const DonationFinishPostDonation = ({ preview, mobilization, widget }) => {
  return (
    <div>
        teste
    </div>
  )
}

DonationFinishPostDonation.propTypes = {
  preview: bool,
  mobilization: object.isRequired,
  widget: object.isRequired
}

export default DonationFinishPostDonation
