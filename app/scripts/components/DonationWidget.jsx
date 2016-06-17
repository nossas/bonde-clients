import React, { PropTypes } from 'react'
import classnames from 'classnames'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'
import * as Paths from './../Paths'
import * as DonationActions from './../actions/DonationActions'
import TellAFriend from './shared/TellAFriend.jsx'
import DonationWidgetValues from './DonationWidgetValues.jsx'

@reactMixin.decorate(Navigation)

export default class DonationWidget extends React.Component {
  static propTypes = {
    mobilization: PropTypes.object.isRequired,
    widget: PropTypes.object.isRequired,
    editable: PropTypes.bool.isRequired,
    configurable: PropTypes.bool,
    hasNewField: PropTypes.bool
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      hasMouseOver: false,
      loading: false,
      success: false,
      errors: []
    }
  }

  componentWillReceiveProps() {
    if (this.state.loading) {
      this.setState({loading: false, success: true})
    }
  }

  handleMouseEnter() {
    this.setState({hasMouseOver: true})
  }

  handleMouseLeave() {
    this.setState({hasMouseOver: false})
  }

  handleClick() {
    const { mobilization, widget, editable } = this.props
    if (editable) {
      this.transitionTo(Paths.donationMobilizationWidget(mobilization.id, widget.id))
    }
  }

  handleClickDonate() {
    const { widget, dispatch } = this.props
    const { success, selected_value } = this.state
    const that = this

    const main_color = (widget.settings ? widget.settings.main_color : '#43a2cc')
    const encryption_key = process.env.PAGARME_KEY || 'setup env var'
    let checkout = new PagarMeCheckout.Checkout({"encryption_key": encryption_key, success: (data) => {
      data.mobilization_id = this.props.mobilization.id
      data.widget_id = this.props.widget.id
      data.amount = widget.settings['donation_value' + selected_value] + "00"
      that.setState({success: true})
      dispatch(DonationActions.finishTransaction(data))
    }, error: function(err) {
      console.log(err)
    }})

    const params = {
      'createToken': 'false',
      'amount': widget.settings['donation_value' + selected_value] + '00',
      'customerData': 'true',
      'paymentMethods': widget.settings.payment_methods === 'true' ? 'credit_card,boleto' : 'credit_card',
      'uiColor': main_color,
      'paymentButtonText': widget.settings.button_text
    }
    checkout.open(params)
  }

  renderButton() {
    const { configurable, widget } = this.props
    const { loading, success } = this.state

    const button_text = (widget.settings ? widget.settings.button_text : 'Doar agora')
    const title_text = (widget.settings ? widget.settings.title_text : 'Clique para configurar seu bloco de doação')

    if (!configurable) {
      return (
        <div className="donation center clearfix">
          <h2 className="mb3">{title_text}</h2>
          <script dangerouslySetInnerHTML={{__html: `
(function(i,s,o,g,r,a,m){i['PagarMeCheckoutObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://assets.pagar.me/checkout/checkout.js','PagarMeCheckout');`}} />

          <DonationWidgetValues configurable={configurable} widget={widget}  />

          <a href="#" onClick={::this.handleClickDonate} className="caps button bg-darken-4 p2 full-width mt1 mb1 ">{button_text}</a>
        </div>
      )
    }
  }

  renderOverlay() {
    const { editable, configurable } = this.props
    if (editable && !configurable && this.state.hasMouseOver) {
      return (
        <div
          className="absolute top-0 right-0 bottom-0 left-0 bg-darken-4 h1 bold flex flex-center"
          style={{zIndex: 9998}}>
          <div className="center full-width white">Clique para editar</div>
        </div>
      )
    }
  }

  renderForm() {
    const { editable, configurable } = this.props
    const className = classnames({'p3 bg-darken-3 relative': editable || !configurable})

    return (
      <div>
        <div className={className}>
          { this.renderButton() }
          { this.renderOverlay() }
        </div>
      </div>
    )
  }

  renderThankyouText() {
    return (
      <TellAFriend {...this.props} message={"Transação enviada!"} />
    )
  }

  render() {
    const {
      editable,
      mobilization: { header_font: headerFont }
    } = this.props

    const { success } = this.state

    return (
      <div>
        <div
          className={`widget ${headerFont}-header`}
          style={(editable ? {cursor: 'pointer'} : null)}
          onMouseEnter={::this.handleMouseEnter}
          onMouseLeave={::this.handleMouseLeave}
          onClick={::this.handleClick}>
          { success ? this.renderThankyouText() : this.renderForm() }
        </div>
      </div>
    )
  }
}
