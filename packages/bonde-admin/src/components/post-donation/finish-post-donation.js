import React from 'react'
import PropTypes from 'prop-types'
import { FinishPostDonation, TellAFriend } from 'bonde-webpage/lib/plugins/donation/components/'
import { FormattedMessage } from 'react-intl'

const FinishPostDonationComponent = ({
  href,
  mobilization,
  widget
}) => {
  const { settings } = widget

  return (
    <div className='center p3 bg-white darkengray rounded'>
      <FinishPostDonation
        mobilization={mobilization}
        widget={widget}
        preview
        onClickDonation={() => null}
        defaultSelectedValue={1}
        finishDonationComponent={TellAFriend}
      />
    </div>
  )
}

FinishPostDonationComponent.propTypes = {
  preview: PropTypes.bool,
  widget: PropTypes.object,
  mobilization: PropTypes.object,
  href: PropTypes.string,
}

export default FinishPostDonationComponent
