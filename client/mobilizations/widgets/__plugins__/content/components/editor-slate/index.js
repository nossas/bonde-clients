import React, { Component } from 'react'
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

import DefaultServerConfig from '~server/config'
import { Loading } from '~components/await'
import { ActionButton, Layer } from '~widget-plugins/content/components'

if (process.env.BROWSER) require('./index.scss')

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
  },
  toolbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 4,
    display: 'none'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 3,
    opacity: '.82',
    fontWeight: 300,
    fontSize: '2.15rem',
    cursor: 'pointer',
    display: 'none'
  }
}

class EditorSlate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editing: false,
      loading: false
    }
  }

  handleSave (state) {
    const { widget: { settings } } = this.props
    const raw = JSON.stringify(Raw.serialize(state))

    if (settings.content !== raw) {
      const { update, widget } = this.props
      update({ ...widget, settings: { content: raw } })
    }
    this.setState({ editing: false })
  }

  render () {
    const { widget: { settings: { content } } } = this.props
    const initialState = Raw.deserialize(JSON.parse(content), { terse: true })
    return (
      <div>
        <SlateEditor plugins={plugins} initialState={initialState} style={{ color: '#fff' }}>
          <SlateToolbar style={{ ...styles.toolbar, display: this.state.editing ? 'block' : 'none' }}>
            <BoldButton className={classNames.button} />
            <ItalicButton className={classNames.button} />
            <UnderlineButton className={classNames.button} />
            <StrikethroughButton className={classNames.button} />
            <AlignmentButtonBar className={classNames.button} />
            <LinkButton className={classNames.button} />
            <ListButtonBar className={classNames.button} />
            <FontFamilyDropdown className={classNames.dropdown} style={styles.dropdown} />
            <FontSizeInput className={classNames.input} {...fontSizePluginOptions} style={styles.input} />
            <ImageButton className={classNames.button} signingUrl={`${DefaultServerConfig.apiUrl}/uploads`} />
            <ColorButton className={classNames.button} initialState={colorPluginOptions} pickerDefaultPosition={{ x: -520, y: 17 }} />
            <GridButtonBar className={classNames.button} />
            <EmbedButton className={classNames.button} />
          </SlateToolbar>

          <SlateContent
            wrapperStyle={{ position: 'relative', zIndex: this.state.editing ? 4 : 'inherit' }}
            style={{ minHeight: 150 }}
            onSelectionChange={() => { this.setState({ editing: true }) }}
          />
          <ActionButton
            editing={this.state.editing}
            className='mt2 right-align'
            onClick={::this.handleSave}
          >
            Salvar
          </ActionButton>
          <Layer
            editing={this.state.editing}
            onClick={::this.handleSave}
          />
        </SlateEditor>
        {this.state.loading && <Loading />}
      </div>
    )
  }
}

export const createEditorContent = content => JSON.stringify(
  Raw.serialize(Plain.deserialize(content), { terse: true })
)

export default EditorSlate
