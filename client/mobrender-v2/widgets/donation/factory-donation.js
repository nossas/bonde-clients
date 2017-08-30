import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import formatNumber from 'format-number'
import { Progress } from '.'

if (require('exenv').canUseDOM) require('./donation.scss')

export default ({
  finishMessageCustom: FinishMessageCustom,
  tellAFriend: DonationTellAFriend
}) => {
  class Donation extends React.Component {
    constructor (props, context) {
      super(props, context)
      this.state = {
        hasMouseOver: false,
        loading: false,
        success: false,
        selected_value: 1,
        selected_payment_type: 'recurring',
        errors: []
      }
    }

    componentDidMount () {
      const { widget } = this.props

      const defaultDonationValue = (
        widget.settings && widget.settings.default_donation_value
          ? widget.settings.default_donation_value
          : 1
      )
      this.setState({ selected_value: Number(defaultDonationValue) })
    }

    componentWillReceiveProps (nextProps) {
      if (this.state.loading) {
        this.setState({ loading: false, success: true })
      }
    }

    handleClickSetTypeDonation (v) {
      this.setState({ selected_payment_type: v })
    }

    handleClickSetValueDonation (v) {
      this.setState({ selected_value: Number(v) })
    }

    handleClickDonate () {
      const { mobilization, widget } = this.props
      const {
        selected_value: selectedValue,
        selected_payment_type: selectedPaymentType
      } = this.state

      this.props.handleDonationTransactionCreate({
        mobilization,
        widget,
        selectedValue,
        selectedPaymentType
      }).then(() => {
        this.setState({ success: true })
      })
    }

    renderButton () {
      const {
        configurable,
        widget,
        donationGoalStats: goal,
        mobilization: { header_font: headerFont }
      } = this.props

      const {
        selected_value: selectedValue,
        selected_payment_type: selectedPaymentType
      } = this.state

      const goalStats = !goal || goal.loading ? undefined : JSON.parse(goal.data)

      const buttonText = ((widget.settings && widget.settings.button_text) ? widget.settings.button_text : 'Doar agora')
      const titleText = ((widget.settings && widget.settings.title_text) ? widget.settings.title_text : 'Clique para configurar seu bloco de doação')

      const donationValue1 = ((widget.settings && widget.settings.donation_value1) ? widget.settings.donation_value1 : 0)
      const donationValue2 = ((widget.settings && widget.settings.donation_value2) ? widget.settings.donation_value2 : 0)
      const donationValue3 = ((widget.settings && widget.settings.donation_value3) ? widget.settings.donation_value3 : 0)
      const donationValue4 = ((widget.settings && widget.settings.donation_value4) ? widget.settings.donation_value4 : 0)
      const donationValue5 = ((widget.settings && widget.settings.donation_value5) ? widget.settings.donation_value5 : 0)
      const mainColor = ((widget.settings && widget.settings.main_color) ? widget.settings.main_color : '#54d0f6')

      const paymentType = ((widget.settings && widget.settings.payment_type) ? widget.settings.payment_type : 'unique')
      const recurringPeriod = ((widget.settings && widget.settings.recurring_period) ? widget.settings.recurring_period : 30)

      const periodLabelOptions = { 30: 'mês', 180: 'semestre', 365: 'ano' }
      const periodLabelCurrent = periodLabelOptions[recurringPeriod]
      const periodLabel = paymentType === 'unique' || selectedPaymentType === 'unique' ? ''
        : periodLabelCurrent

      if (!configurable) {
        return (
          <div className='donation center clearfix'>
            <h2
              className='p2 m0 white rounded-top'
              style={{ fontFamily: headerFont, backgroundColor: mainColor }}
            >
              {titleText}
            </h2>
            <script dangerouslySetInnerHTML={{__html: `
  (function(i,s,o,g,r,a,m){i['PagarMeCheckoutObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://assets.pagar.me/checkout/checkout.js','PagarMeCheckout');`}} />
            <div className='p3 relative'>

              {paymentType === 'users_choice' ? <div className='mb2 clearfix'>
                <a href='#' onClick={::this.handleClickSetTypeDonation.bind(this, 'recurring')}
                  style={selectedPaymentType === 'recurring' ? {color: mainColor} : {}}
                  className={selectedPaymentType === 'recurring' ? 'payment-type bold py1 col col-6 active' : 'payment-type bold py1 col col-6'}>
                  <i className='icon-payment-recurring' />
                  {'Apoiar todo ' + periodLabelCurrent}
                </a>
                <a href='#' onClick={::this.handleClickSetTypeDonation.bind(this, 'unique')}
                  style={selectedPaymentType === 'unique' ? {color: mainColor} : {}}
                  className={selectedPaymentType === 'unique' ? 'payment-type bold py1 col col-6 active' : 'payment-type bold py1 col col-6'}>
                  <i className='icon-payment-unique' />
                  Doação única
                </a>
              </div> : ''}

              {goalStats && (
                <div className='donation-goal-progress'>
                  <Progress value={goalStats.progress} />
                  <div className='progress-description'>
                    <div className='progress-value'>
                      {formatNumber({ decimal: ',', truncate: 0 })(goalStats.progress)}%
                    </div>
                    <div className='goal-value'>
                      {
                        formatNumber({
                          prefix: 'R$ ',
                          integerSeparator: '.',
                          decimal: ',',
                          padRight: 2,
                          truncate: 2
                        })(goalStats.goal)
                      }
                    </div>
                  </div>
                </div>
              )}

              {donationValue1 <= 0 ? null : (
                <a
                  href='#'
                  onClick={::this.handleClickSetValueDonation.bind(this, 1)}
                  style={selectedValue !== 1 ? {} : { backgroundColor: this.convertHex(mainColor, 35), color: mainColor }}
                  className={classnames('value-option block mb1 py1 col-12 bold hover no-underscore', selectedValue === 1 ? 'active' : 'bg-darken-1')}
                >
                  {'R$ ' + donationValue1 + (paymentType === 'recurring' || (selectedPaymentType === 'recurring' && paymentType !== 'unique') ? ' /' : '') + periodLabel}
                </a>
              )}
              {donationValue2 <= 0 ? null : (
                <a
                  href='#'
                  onClick={::this.handleClickSetValueDonation.bind(this, 2)}
                  style={selectedValue !== 2 ? {} : { backgroundColor: this.convertHex(mainColor, 35), color: mainColor }}
                  className={classnames('value-option block mb1 py1 col-12 bold hover no-underscore', selectedValue === 2 ? 'active' : 'bg-darken-1')}
                >
                  {'R$ ' + donationValue2 + (paymentType === 'recurring' || (selectedPaymentType === 'recurring' && paymentType !== 'unique') ? ' /' : '') + periodLabel}
                </a>
              )}
              {donationValue3 <= 0 ? null : (
                <a
                  href='#'
                  onClick={::this.handleClickSetValueDonation.bind(this, 3)}
                  style={selectedValue !== 3 ? {} : { backgroundColor: this.convertHex(mainColor, 35), color: mainColor }}
                  className={classnames('value-option block mb1 py1 col-12 bold hover no-underscore', selectedValue === 3 ? 'active' : 'bg-darken-1')}
                >
                  {'R$ ' + donationValue3 + (paymentType === 'recurring' || (selectedPaymentType === 'recurring' && paymentType !== 'unique') ? ' /' : '') + periodLabel}
                </a>
              )}
              {donationValue4 <= 0 ? null : (
                <a
                  href='#'
                  onClick={::this.handleClickSetValueDonation.bind(this, 4)}
                  style={selectedValue !== 4 ? {} : { backgroundColor: this.convertHex(mainColor, 35), color: mainColor }}
                  className={classnames('value-option block mb1 py1 col-12 bold hover no-underscore', selectedValue === 4 ? 'active' : 'bg-darken-1')}
                >
                  {'R$ ' + donationValue4 + (paymentType === 'recurring' || (selectedPaymentType === 'recurring' && paymentType !== 'unique') ? ' /' : '') + periodLabel}
                </a>
              )}
              {donationValue5 <= 0 ? null : (
                <a
                  href='#'
                  onClick={::this.handleClickSetValueDonation.bind(this, 5)}
                  style={selectedValue !== 5 ? {} : { backgroundColor: this.convertHex(mainColor, 35), color: mainColor }}
                  className={classnames('value-option block mb1 py1 col-12 bold hover no-underscore', selectedValue === 5 ? 'active' : 'bg-darken-1')}
                >
                  {'R$ ' + donationValue5 + (paymentType === 'recurring' || (selectedPaymentType === 'recurring' && paymentType !== 'unique') ? ' /' : '') + periodLabel}
                </a>
              )}

              <a
                href='#'
                onClick={::this.handleClickDonate}
                style={{ backgroundColor: mainColor }}
                className='btn white caps bg-darken-4 p2 mt1 col-12 rounded border-box'
              >
                {buttonText}
              </a>
            </div>
          </div>
        )
      }
    }

    convertHex (hex, opacity) {
      hex = hex.replace('#', '')
      let r = parseInt(hex.substring(0, 2), 16)
      let g = parseInt(hex.substring(2, 4), 16)
      let b = parseInt(hex.substring(4, 6), 16)

      let result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')'
      return result
    }

    renderForm () {
      const { editable, configurable } = this.props
      const className = classnames({ 'relative': editable || !configurable })

      return (
        <div className={className}>
          {this.renderButton()}
        </div>
      )
    }

    renderThankyouText () {
      const { mobilization, widget } = this.props
      const { settings: { finish_message_type: finishMessageType } } = widget

      return finishMessageType === 'custom' ? (
        <FinishMessageCustom widget={widget} />
      ) : (
        <DonationTellAFriend mobilization={mobilization} widget={widget} />
      )
    }

    render () {
      return (
        <div className='bg-white widget rounded'>
          {this.state.success ? this.renderThankyouText() : this.renderForm()}
        </div>
      )
    }
  }

  Donation.propTypes = {
    mobilization: PropTypes.object.isRequired,
    widget: PropTypes.object.isRequired,
    editable: PropTypes.bool.isRequired,
    configurable: PropTypes.bool,
    hasNewField: PropTypes.bool,
    handleDonationTransactionCreate: PropTypes.func
  }

  return Donation
}
