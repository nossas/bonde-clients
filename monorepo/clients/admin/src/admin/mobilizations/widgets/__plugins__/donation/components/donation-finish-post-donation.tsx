
import { bool, object } from 'prop-types'
import { FinishPostDonationComponent } from './../../../../../components/post-donation'
import * as paths from './../../../../../paths'


const DonationFinishPostDonation = ({ preview, mobilization, widget }) => {
  return (
    <FinishPostDonationComponent
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
