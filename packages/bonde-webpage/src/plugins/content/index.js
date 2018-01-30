import React from 'react'
import {
  SlateEditor, SlateContent, SlateToolbar,
  BoldPlugin, BoldButton
} from 'slate-editor'

const plugins = [BoldPlugin()]

export default ({ widget, readOnly }) => {
  const initialState = JSON.parse(widget.settings.content)
  
  return (
    <SlateEditor readOnly={readOnly} plugins={plugins} initialState={initialState}>
      <SlateToolbar style={{ display: readOnly ? 'none' : 'block' }}>
        <BoldButton />
      </SlateToolbar>
     <SlateContent
      style={{ minHeight: 150 }}
      readOnly={readOnly}
    />
    </SlateEditor>
  )
}

