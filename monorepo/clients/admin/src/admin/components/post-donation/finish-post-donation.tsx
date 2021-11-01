
import PropTypes from 'prop-types'

const FinishPostDonationComponent = ({
  mobilization,
  widget,
}) => {
  return (
    <div className='center p3 bg-white darkengray rounded'>
      {/* <FinishPostDonation
        mobilization={mobilization}
        widget={widget}
        preview
        onClickDonation={() => null}
        defaultSelectedValue={1}
        finishDonationComponent={FinishPostDonation}
        imageUrl={imageUrl}
      /> */}
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
