import React from 'react'
import { Raw, Plain } from 'slate'
import {
  SlateEditor, SlateToolbar, SlateContent,
  AlignmentPlugin, AlignmentButtonBar,
  BoldPlugin, BoldButton,
  ColorPlugin, ColorButton, ColorStateModel,
  EmbedPlugin, EmbedButton,
  FontFamilyPlugin, FontFamilyDropdown,
  FontSizePlugin, FontSizeInput,
  GridPlugin, GridButtonBar,
  ImagePlugin, ImageButton,
  ItalicPlugin, ItalicButton,
  LinkPlugin, LinkButton,
  ListPlugin, ListButtonBar,
  StrikethroughPlugin, StrikethroughButton,
  UnderlinePlugin, UnderlineButton
} from 'slate-editor'

const fontSizePluginOptions = { initialFontSize: 16 }
const colorPluginOptions = new ColorStateModel().rgba({ r: 100, g: 100, b: 100, a: 1 }).gen()

const plugins = [
  AlignmentPlugin(),
  BoldPlugin(),
  ColorPlugin(),
  EmbedPlugin(),
  FontFamilyPlugin(),
  FontSizePlugin(fontSizePluginOptions),
  GridPlugin(),
  ImagePlugin(),
  ItalicPlugin(),
  LinkPlugin(),
  ListPlugin(),
  StrikethroughPlugin(),
  UnderlinePlugin()
]

const classNames = {
  button: 'btn btn-primary not-rounded border border-gray',
  dropdown: 'select col-3 inline-block mx1 not-rounded',
  input: 'input col-3 inline-block mr1',
  lastButton: 'btn btn-primary not-rounded border border-gray linebreak'
}
const styles = {
  button: {
    borderRight: '1px solid #fff'
  },
  dropdown: {
    position: 'relative',
    top: 1,
    backgroundColor: 'white',
    height: 38,
    paddingLeft: 20,
    border: '3px solid #0275d8',
    color: '#0275d8',
    margin: '0',
    WebkitAppearance: 'none',
    padding: '0 10px 0 15px'
  },
  input: {
    position: 'relative',
    top: 1,
    backgroundColor: 'white',
    borderRadius: 0,
    height: 16,
    margin: 0,
    color: '#0275d8',
    border: '3px solid #0275d8'
  }
}

const EditorSlate = () => (
  <SlateEditor plugins={plugins}>
    <SlateToolbar style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 3 }}>
      <BoldButton className={classNames.button} />
      <ItalicButton className={classNames.button} />
      <UnderlineButton className={classNames.button} />
      <StrikethroughButton className={classNames.button} />
      <AlignmentButtonBar className={classNames.button} />
      <LinkButton className={classNames.button} />
      <ListButtonBar className={classNames.button} />
      <FontFamilyDropdown className={classNames.dropdown} style={styles.dropdown} />
      <FontSizeInput className={classNames.input} {...fontSizePluginOptions} style={styles.input} />
      <ImageButton className={classNames.button} />
      <ColorButton className={classNames.button} initialState={colorPluginOptions} pickerDefaultPosition={{ x: -520, y: 17 }} />
      <GridButtonBar className={classNames.button} />
      <EmbedButton className={classNames.button} />
    </SlateToolbar>

    <SlateContent />
  </SlateEditor>
)

export const createEditorContent = content => JSON.stringify(
  Raw.serialize(Plain.deserialize(content))
)

export default EditorSlate
