import React from 'react'
import FormSelect from './form-select'
import PropTypes from 'prop-types'

class FinishPostDonation extends React.Component {
  constructor(p) {
    super(p)
    this.state = {
      value: this.props.defaultSelectedValue,
      success: false
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const {value} = e.currentTarget
    this.setState({ value: Number(value) })
  }

  render() {
    const {
      // Passed Donation to Finish by props
      mobilization,
      widget,
      donationCustomerData,
      // Passed Donation to Finish by state
      defaultSelectedValue,
      onClickDonation,
      finishDonationComponent: FinishDonationComponent
    } = this.props
  
    return this.state.success ? (
      <FinishDonationComponent
        message={this.state.donationValue
          ? 'widgets.components--donation.finish-post-donation-messages.donation-ok'
          : 'widgets.components--donation.finish-post-donation-messages.not-now'}
      />
    ) : (
      <FormSelect
        mobilization={mobilization}
        widget={widget}
        onChange={this.handleChange}
        value={defaultSelectedValue}
        onSubmit={async (value) => {
          await onClickDonation(value)
          this.setState({
            success: true,
            donationValue: value
          })
        }}
      />
    )
  }
}

FinishPostDonation.propTypes = {
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired.isRequired,
  donationCustomerData: PropTypes.object.isRequired,
  defaultSelectedValue: PropTypes.number.isRequired,
  onClickDonation: PropTypes.func.isRequired,
  finishDonationComponent: PropTypes.func.isRequired
}

export default FinishPostDonation