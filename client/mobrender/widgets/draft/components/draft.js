import React from 'react'
import DraftButton from './draft-button'
import widgets from '~client/mobrender/widgets/config'

const Draft = ({ mobilization, widget, update }) => {
  const updateKind = props => update({...widget, ...props})
  const widgetsConfig = widgets(mobilization, widget).filter(w => w.kind !== 'draft')

  return (
    <div className='draft-widget widget center rounded lightgray clearfix'>
      {widgetsConfig.map((wc, index) => {
        const props = Object.assign({}, wc)
        delete props.component
        return <DraftButton key={`wc-${index}`} updateKind={updateKind} {...props} />
      })}
    </div>
  )
}

export default Draft
