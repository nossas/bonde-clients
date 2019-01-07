import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Section, Footer, ScrollContainer, Navigation } from './components'

/**
 * A mobilization has two modes, in editing ({ editable: true })
 * and only rendering ({ editable: false }).
 * When a mobilization is in edit mode, it needs to receive extra
 * properties that will be used for block and widgets editing.
 */
class Mobilization extends React.Component {

  render () {
  	// Props used on editable mode
  	const { editable, newBlockButton: NewBlockButton } = this.props
    // Props to customize layout themes
    // TODO: Rever funcionamento da customização de layouts
    const { colorScheme, headerFont, bodyFont } = this.props
    const themeClassName = `${colorScheme} ${headerFont}-header ${bodyFont}-body`
    const layoutClassName = editable ? 'flex-auto relative' : 'absolute'
    const layoutStyle = !editable ? { top: 0, bottom: 0, left: 0, right: 0 } : undefined
    // Props to render blocos
    const {
      blocks,
      blockWrapper,
      linkTo,
      blockWidgetsRef,
      widgets,
      widgetComponent
    } = this.props

    const visibleBlocks = !editable ? blocks.filter(b => !b.hidden) : blocks

  	return (
  	  <div className={classnames('flex flex-column', themeClassName, layoutClassName)} style={layoutStyle}>
        <Navigation blocks={visibleBlocks} editable={editable} linkTo={linkTo} />
  	    <ScrollContainer>
          {visibleBlocks.map((b, i) => (
            <Section
              key={`section-${i}`}
              anchor={linkTo(b)}
              block={b}
              editable={editable}
              wrapper={blockWrapper}
              widgets={blockWidgetsRef(b, widgets)}
              widgetComponent={widgetComponent}
            />
          ))}
  	      {editable && NewBlockButton && (<NewBlockButton />)}
  	  	  <Footer />
        </ScrollContainer>
      </div>
  	)
  }
}

Mobilization.defaultProps = {
  editable: false,
  blocks: [],
  widgets: [],
  blockWidgetsRef: (b, ws) => ws.filter(w => w.block_id === b.id)
}

Mobilization.propTypes = {
  /* Define when the mobilization is in edit mode. */
  editable: PropTypes.bool,
  /* Function used to link navigation bar with block,
   * receives block as parameter and should return a string like id. */
  linkTo: PropTypes.func.isRequired,
  /* This component is rendered just below the list of blocks,
   * and should lead to the addition of a new block when it is clicked
   * 
   * TODO: Review button should external to the mobilization component.
   */
  newBlockButton: PropTypes.any,
  /* Sections of your mobilization, you will receive an item from this
   * list when you are rendering block customization. */
  blocks: PropTypes.array,
  /* This component renders wrapped to the block, in it you can
   * customize the rendering of your block, get block and editable
   * as property. */
  blockWrapper: PropTypes.any,
  /* Array of widgets object used on render. */
  widgets: PropTypes.array.isRequired,
  /* Component responsible to render a widget logic,
   * receive { widget } props */
  widgetComponent: PropTypes.any.isRequired,
  /* Function used to link widgets with block, receives (block, widgets)
   * as param.
   * Default function use the attrs widget.block_id to relationship. */
  blockWidgetsRef: PropTypes.func.isRequired
}

export default Mobilization