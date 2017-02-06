import React, { PropTypes } from 'react'

const WidgetOverlay = ({ children, widget, onClick, onMouseOver, onMouseOut, hasMouseOver }) => (
  <div
    className='relative'
    style={{ cursor: 'pointer' }}
    onMouseOver={() => onMouseOver(widget.id)}
    onMouseOut={() => onMouseOut()}
    onClick={() => onClick()}
  >
    {children}
    {hasMouseOver ? (
      <div className='overlay h1 rounded z1 border border-pagenta px2'>
        <div className='table full-height col-12 center'>
          <div className='white table-cell align-middle'>
            {'Clique para editar'}
          </div>
        </div>
      </div>
    ) : null}
  </div>
)

WidgetOverlay.propTypes = {
  widget: PropTypes.object,
  editable: PropTypes.bool,
  hasMouseOver: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func
}

export default WidgetOverlay
