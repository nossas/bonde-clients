import React, { PropTypes } from 'react'
import classnames from 'classnames'

export default class DonationWidget extends React.Component {
  static propTypes = {
    widget: PropTypes.object.isRequired,
    editable: PropTypes.bool.isRequired,
    configurable: PropTypes.bool,
    hasNewField: PropTypes.bool
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      selected_value: 1
    }
  }

  componentWillReceiveProps() {
    const { widget } = this.props
    const default_donation_value = (widget.settings ? widget.settings.default_donation_value : 1)
    this.setState({selected_value: Number(default_donation_value)})
  }

  handleClickSetValueDonation(v) {
    this.setState({selected_value: Number(v)})
  }

  render() {
    const { configurable, widget } = this.props
    const { selected_value } = this.state

    const button_text = (widget.settings ? widget.settings.button_text : 'Doar agora')
    const title_text = (widget.settings ? widget.settings.title_text : 'Clique para configurar seu bloco de doação')
    const donation_value1 = (widget.settings ? widget.settings.donation_value1 : 0)
    const donation_value2 = (widget.settings ? widget.settings.donation_value2 : 0)
    const donation_value3 = (widget.settings ? widget.settings.donation_value3 : 0)
    const donation_value4 = (widget.settings ? widget.settings.donation_value4 : 0)
    const donation_value5 = (widget.settings ? widget.settings.donation_value5 : 0)

    const payment_type = (widget.settings ? widget.settings.payment_type : 'unique')
    const recurring_period = (widget.settings ? widget.settings.recurring_period : 1)
    const periodLabel = ''

    if (!configurable) {
      return (
        <div>
          {donation_value1 > 0 ? <a href="#" onClick={::this.handleClickSetValueDonation.bind(this, 1)} className={selected_value === 1 ? 'p1 mx-auto block mb2 col-10 bold bg-darken-3' : 'p1 mx-auto block mb2 col-10 bold bg-darken-2'}>{"R$ " + donation_value1 + periodLabel}</a> : ''}
          {donation_value2 > 0 ? <a href="#" onClick={::this.handleClickSetValueDonation.bind(this, 2)} className={selected_value === 2 ? 'p1 mx-auto block mb2 col-10 bold bg-darken-3' : 'p1 mx-auto block mb2 col-10 bold bg-darken-2'}>{"R$ " + donation_value2 + periodLabel}</a> : ''}
          {donation_value3 > 0 ? <a href="#" onClick={::this.handleClickSetValueDonation.bind(this, 3)} className={selected_value === 3 ? 'p1 mx-auto block mb2 col-10 bold bg-darken-3' : 'p1 mx-auto block mb2 col-10 bold bg-darken-2'}>{"R$ " + donation_value3 + periodLabel}</a> : ''}
          {donation_value4 > 0 ? <a href="#" onClick={::this.handleClickSetValueDonation.bind(this, 4)} className={selected_value === 4 ? 'p1 mx-auto block mb2 col-10 bold bg-darken-3' : 'p1 mx-auto block mb2 col-10 bold bg-darken-2'}>{"R$ " + donation_value4 + periodLabel}</a> : ''}
          {donation_value5 > 0 ? <a href="#" onClick={::this.handleClickSetValueDonation.bind(this, 5)} className={selected_value === 5 ? 'p1 mx-auto block mb2 col-10 bold bg-darken-3' : 'p1 mx-auto block mb2 col-10 bold bg-darken-2'}>{"R$ " + donation_value5 + periodLabel}</a> : ''}
        </div>
      )
    }
  }
}
