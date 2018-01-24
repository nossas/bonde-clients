import React from 'react'
/**
 *
 * # Widget:
 *
 * Componente responsável por renderizar a parte unidade da mobilização.
 *
 * **Propriedades:**
 *
 * - renderOverlay(widget): Component
 *   
 *   O Component retornado por essa função será renderizado quando
 *   mouseOver for ativado no Widget.
 * 
 * - widget: JSON
 *
 *   Objeto de configuração do widget possui os metadados de widget em
 *   `widget.settings`, o tipo de widget que será renderização em
 *   `widget.kind`
 *
 */

/**
 * Plugins:
 *
 * Plugins deve ser uma lista de objetos de configurações baseado
 * no tipo `kind` da widget, abaixo as propriedades configuráveis.
 *
 * - kind: String
 *   
 *   Utilizada para combinar com a Widget de mesmo `kind`
 * 
 * - component: Component
 *
 *   Render principal da Widget
 *
 * - renderOverlay: Component
 *
 *  Com está propriedade setada, o componente de overlay é
 *  renderizado quando acontece o mouseEnter no Widget.
 *
 */

export const createWidget = ({ plugins }) => class Widget extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = { mouseOver: false }
  }

  getPlugin (kind) {
    const plugin = plugins.filter(opts => opts.kind === kind)[0]
    if (!plugin) {
      throw new Error(`Widget with kind ${kind} not exists in plugins configuration`)
    }
    return plugin
  }

  render () {
    const { widget } = this.props
    const {
      component: WidgetComponent,
      renderOverlay: OverlayComponent
    } = this.getPlugin(widget.kind)
    
    // colunagem com classe css
    const renderWidget = <WidgetComponent widget={widget} />
    const { sm_size: smSize, md_size: mdSize, lg_size: lgSize } = widget
    const className = `col-${smSize} sm-col-${smSize} md-col-${mdSize} lg-col-${lgSize}`

    return (
      <div
        className={`widget ${className}`}
        style={{position: 'relative'}}
        onMouseEnter={() => this.setState({ mouseOver: true })}
        onMouseLeave={() => this.setState({ mouseOver: false })}
      >
        {this.state.mouseOver && OverlayComponent ? (
          <OverlayComponent widget={widget}>
           {renderWidget} 
          </OverlayComponent>
        ) : renderWidget}
      </div>
    )
  }
}
