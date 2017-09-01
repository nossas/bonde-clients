import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import * as formatNumberHelper from '~client/utils/format-number-helper'
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

    progressProps (goalStats) {
      let goalDateRemaining
      const { widget: { settings } } = this.props

      if (settings && settings.goal_date_limit) {
        const now = new Date()
        const [day, month, year] = settings.goal_date_limit.split('/')
        const goalDate = new Date(`${year}-${month}-${day}`)
        goalDateRemaining = parseInt((goalDate - now) / (1000 * 60 * 60 * 24))
      }

      let value = 0
      let valueTopLeft = ''
      let valueTopRight = ''
      let valueBottomLeft = ''
      let valueBottomRight = ''

      if (goalStats.total_donations) {
        valueTopLeft = `${goalStats.total_donations} doações`
      }
      if (goalDateRemaining !== undefined) {
        if (goalDateRemaining === 0)
          valueTopRight = 'último dia dentro do prazo'
        else if (goalDateRemaining < 0) {
          const positiveDay = goalDateRemaining * -1
          const pluralizeDay = positiveDay === 1 ? 'dia' : 'dias'
          valueTopRight = (
            <span style={{ color: 'hsl(348, 100%, 61%)' }}>
              {positiveDay} {pluralizeDay} de atraso
            </span>
          )
        }
        else {
          const pluralizeDay = goalDateRemaining === 1 ? 'dia' : 'dias'
          valueTopRight = `${goalDateRemaining} ${pluralizeDay} faltando`
        }
      }
      if (goalStats.progress) {
        value = goalStats.progress
        valueBottomLeft = `${parseInt(goalStats.progress)}%`
      }
      if (goalStats.goal) {
        valueBottomRight = formatNumberHelper.currency(goalStats.goal)
      }

      return { value, valueTopLeft, valueTopRight, valueBottomLeft, valueBottomRight }
    }

    renderButton () {
      const {
        configurable,
        widget: { settings, goal },
        donationGoalStats,
        mobilization: { header_font: headerFont }
      } = this.props

      const {
        selected_value: selectedValue,
        selected_payment_type: selectedPaymentType
      } = this.state

      const goalStats = (
        !donationGoalStats ||
        !donationGoalStats.data ||
        donationGoalStats.loading
      )
        ? undefined
        : JSON.parse(donationGoalStats.data)

      const buttonText = (settings && settings.button_text) || 'Doar agora'
      const titleText = (settings && settings.title_text) || 'Clique para configurar seu bloco de doação'

      const donationValue1 = (settings && settings.donation_value1) || 0
      const donationValue2 = (settings && settings.donation_value2) || 0
      const donationValue3 = (settings && settings.donation_value3) || 0
      const donationValue4 = (settings && settings.donation_value4) || 0
      const donationValue5 = (settings && settings.donation_value5) || 0
      const mainColor = (settings && settings.main_color) || '#54d0f6'

      const paymentType = (settings && settings.payment_type) || 'unique'
      const recurringPeriod = (settings && settings.recurring_period) || 30

      const isUniquePayment = paymentType === 'unique' || selectedPaymentType === 'unique'
      const periodLabelOptions = { 30: 'mês', 180: 'semestre', 365: 'ano' }
      const periodLabelCurrent = periodLabelOptions[recurringPeriod]
      const periodLabel = isUniquePayment ? '' : periodLabelCurrent

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
})(window,document,'script','https://assets.pagar.me/checkout/checkout.js','PagarMeCheckout');`
            }} />
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

              {goalStats && goal && (
                <Progress
                  className='my1'
                  fillColor={mainColor}
                  {...this.progressProps(goalStats)}
                />
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
