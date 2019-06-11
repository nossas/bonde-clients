import React from 'react'
import PropTypes from 'prop-types'
import { FinishPostDonation, TellAFriend } from 'bonde-webpage/lib/plugins/donation/components/'

const imageUrl = require('exenv').canUseDOM ? require('../share/') : null

const FinishPostDonationComponent = ({
  href,
  mobilization,
  widget,
  message
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
        finishDonationComponent={() =>
          <TellAFriend
            mobilization={mobilization}
            widget={widget}
            imageUrl={imageUrl}
        />}
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
