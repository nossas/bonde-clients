import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Footer, ScrollContainer } from './components'

/**
 * A mobilization can have two modes, in editing and only rendering.
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

  	return (
  	  <div className={classnames('flex flex-column', themeClassName, layoutClassName)} style={layoutStyle}>
  	    <ScrollContainer>
  	      {editable && NewBlockButton && (<NewBlockButton />)}
  	  	  <Footer />
        </ScrollContainer>
      </div>
  	)
  }
}

Mobilization.defaultProps = {
  editable: false
}

Mobilization.propTypes = {
  /* Define when the mobilization is in edit mode. */
  editable: PropTypes.bool,
  /* this component is rendered just below the list of blocks,
   * and should lead to the addition of a new block when it is clicked */
  newBlockButton: PropTypes.any
}

export default Mobilization