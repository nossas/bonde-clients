import React from 'react'
import { bool, object } from 'prop-types'
import * as paths from 'paths'
import { FinishPostDonationComponent } from 'components/post-donation'

import { TellAFriendBase } from 'bonde-webpage'

const DonationFinishPostDonation = ({ preview, mobilization, widget }) => {
  return (
    <FinishPostDonationComponent
      preview={preview}
      mobilization={mobilization}
      widget={widget}
      message={ ({message}) => 
        <TellAFriendBase
          preview={preview}
          mobilization={mobilization}
          widget={widget}
          message={message}
      />
      }
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
