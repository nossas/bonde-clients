import React, { Component } from 'react'

// TODO: Analisar se a melhor maneira não é conectar
// apenas componentes wrapper, e utilizar do padrão HighOrderComponent
// para repassar o estado de acordo com a necessidade
// - facilidade em testar
// - padronização
class WrapperMobilizationApp extends Component {

  render() {
    const { children, ...otherProps } = this.props
    return (
      <span>
        {
          React.cloneElement(children, {...otherProps})
        }
      </span>
    )
  }
}

export default WrapperMobilizationApp
