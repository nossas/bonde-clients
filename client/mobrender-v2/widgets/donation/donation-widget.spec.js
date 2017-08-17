import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { Map } from 'immutable'

// TODO: Move DonationWidget
import { DonationWidget } from '~client/mobilizations/widgets/__plugins__/donation/components'


describe('<DonationWidget />', () => {
  let donationWidget
  const props = Map({
    mobilization: Map({ id: 1, header_font: 'Ubuntu Mono' }),
    widget: Map({ id: 3, kind: 'donation', settings: {} })
  })
  
  beforeEach(() => {
    donationWidget = mount(<DonationWidget {...props.toJS()} />)
  })
  
  it('should render without crash', () => {
    // TODO: Change displayName for this component
    expect(DonationWidget.displayName).to.equal('Donation')
    expect(donationWidget).to.be.ok
  })

  it('should set a default donation value in component state', () => {
    const defaultDonationValue = 10
    const newProps = props.mergeDeep({
      widget: Map({
        settings: Map({ default_donation_value: defaultDonationValue })
      })
    }).toJS()
    expect(
      mount(<DonationWidget {...newProps} />)
        .instance()
        .state.selected_value
    ).to.equal(defaultDonationValue)
  })

  it('should set success in state when is loading and receive props', () => {
    // TODO: This behavior is confused
    donationWidget.instance().setState({ loading: true, sucess: false })
    const newProps = props.mergeDeep({
      widget: Map({ 
        settings: Map({
          finish_message_type: 'custom'
        })
      })
    }).toJS()
    donationWidget.setProps(newProps)
    expect(donationWidget.instance().state.loading).to.equal(false)
    expect(donationWidget.instance().state.success).to.equal(true)
  })
})
