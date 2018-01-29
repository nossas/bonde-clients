import React from 'react'
import styled from 'styled-components'
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

const Column = styled.div`{
  position: relative;
  grid-column: ${props => props.size} span;
}`

export const createWidget = ({ plugins }) => class Widget extends React.Component {
  
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
    
    // TODO: verificar como será trabalhado o responsivo
    const { lg_size: lgSize } = widget

    return (
      <Column size={lgSize}>
        {OverlayComponent && (<OverlayComponent widget={widget} />)}
        <WidgetComponent widget={widget} />
      </Column>
    )
  }
}
