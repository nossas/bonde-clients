import React, { PropTypes } from 'react'
import classnames from 'classnames'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'
import { bindActionCreators } from 'redux'
import * as Paths from './../Paths'

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


  renderButton() {
    const { configurable, widget } = this.props
    const { loading, success } = this.state
console.log(widget.settings)
    if (!configurable) {
      return (
        <div className="donation">
          <script dangerouslySetInnerHTML={{__html: `
(function(i,s,o,g,r,a,m){i['PagarMeCheckoutObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://assets.pagar.me/checkout/checkout.js','PagarMeCheckout');`}} />
          <a className="values" href="#">R$ 15</a>
          <a className="values" href="#">R$ 30</a>
          <a className="values" href="#">R$ 45</a>
          <button onClick={::this.handleClickDonate}>Doe</button>
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

  handleClickDonate() {

      // INICIAR A INSTÂNCIA DO CHECKOUT
      // declarando um callback de sucesso
      var checkout = new PagarMeCheckout.Checkout({"encryption_key":"ek_test_PYsS1XrZsCCF7wynC67YEi5RW3lSCV", success: function(data) {
       console.log(data);
      }});

      // DEFINIR AS OPÇÕES
      // e abrir o modal
      var params = {"customerData":false, "amount":"100000", "createToken": "true", "interestRate": 10 };
      checkout.open(params);
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
          { success ? this.renderShareButtons() : this.renderForm() }
        </div>
      </div>
    )
  }
}
