import React from "react";
import styled from 'styled-components';
import { SlateEditor, SlateToolbar, SlateContent } from "slate-editor";
import { BoldPlugin, BoldButton } from "@slate-editor/bold-plugin";
import { ItalicPlugin, ItalicButton } from "@slate-editor/italic-plugin";
import { UnderlinePlugin, UnderlineButton } from "@slate-editor/underline-plugin";
import { StrikethroughPlugin, StrikethroughButton } from "@slate-editor/strikethrough-plugin";
import { AlignmentPlugin, AlignmentButtonBar } from "@slate-editor/alignment-plugin";
import { LinkPlugin, LinkButton } from "@slate-editor/link-plugin";
import { ListPlugin, ListButtonBar } from "@slate-editor/list-plugin";
import { FontFamilyPlugin, FontFamilyDropdown } from "@slate-editor/font-family-plugin";
import { FontSizePlugin, FontSizeInput } from "@slate-editor/font-size-plugin";
import { ImagePlugin, ImageButton } from "@slate-editor/image-plugin";
import { ColorPlugin, ColorButton, ColorStateModel } from "@slate-editor/color-plugin";
import { GridPlugin, GridButtonBar } from "@slate-editor/grid-plugin";
import { EmbedPlugin, EmbedButton } from "@slate-editor/embed-plugin";
import { StateLoggerButton } from '@slate-editor/state-logger'
import { ToggleReadOnlyButton } from '@slate-editor/toggle-readonly'

const Styles = styled.div`
  .editor--root {
    width: 65%;
  }

  .editor--content {
    border: 1px solid #ccc;
    padding: .2rem;

    & > div {
      min-height: 100px;
    }
  }

  .editor--toolbar {
    background-color: #0275d8;
  }

  .toolbar--footer > * {
    float: right;
  }

  .toolbar--button {
    border-radius: 0;
    color: #fff;
    background-color: #0074d9;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
    display: inline-block;
    line-height: 1.125rem;
    padding: .5rem 1rem;
    margin: 0;
    height: 38px;
    border: 1px solid transparent;
    border-right: 1px solid #fff;
    vertical-align: middle;
  }
  .toolbar--dropdown {
    border-radius: 0;
    width: 25%;
    display: inline-block;
    position: relative;
    background-color: white;
    color: #0275d8;
    margin: 0;
    padding: 0 10px 0 15px;
    height: 38px;
    border: 3px solid #0275d8;

    &:focus {
      outline: none;
    }
  }
  .toolbar--input {
    display: inline-block;
    height: 38px;
    padding: 0px 10px 0px 15px;
    position: relative;
    background-color: white;
    border-radius: 0;
    margin: 0;
    color: #0275d8;
    border: 3px solid #0275d8;
    
    &:focus {
      outline: none;
    }
  }
`;

const fontSizePluginOptions = { initialFontSize: 16 };
const colorPluginOptions = new ColorStateModel()
  .rgba({ r: 100, g: 100, b: 100, a: 1 })
  .gen();

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
  UnderlinePlugin(),
];

const classNames = {
  button: "toolbar--button",
  dropdown: "toolbar--dropdown",
  input: "toolbar--input",
  lastButton: "toolbar--button linebreak",
};

type RichEditorProps = {
  value: any
  onChange: any
}

const RichEditor = ({ value, onChange }: RichEditorProps) => (
  <Styles>
    <SlateEditor
      plugins={plugins}
      initialState={value}
      onChange={onChange}
    >
      {/* Toolbar */}
      <SlateToolbar>
        <BoldButton className={classNames.button} />
        <ItalicButton className={classNames.button} />
        <UnderlineButton className={classNames.button} />
        <StrikethroughButton className={classNames.button} />
        <AlignmentButtonBar className={classNames.button} />
        <LinkButton className={classNames.button} />
        <ListButtonBar className={classNames.button} />
      </SlateToolbar>
      {/* Toolbar */}
      <SlateToolbar>
        <FontFamilyDropdown className={classNames.dropdown} />
        <FontSizeInput
          {...fontSizePluginOptions}
          className={classNames.input}
        />
        <ImageButton
          className={classNames.button}
          signingUrl={process.env.REACT_APP_UPLOADS_URL}
        />
        <ColorButton
          className={classNames.button}
          initialState={colorPluginOptions}
          pickerDefaultPosition={{ x: -520, y: 17 }}
        />
        <GridButtonBar className={classNames.button} />
        <EmbedButton className={classNames.button} />
      </SlateToolbar>
      {/* Content */}
      <SlateContent />
      {/* Toolbar */}
      <SlateToolbar className='toolbar--footer'>
        <StateLoggerButton className={classNames.button} />
        <ToggleReadOnlyButton className={classNames.button} />
      </SlateToolbar>
    </SlateEditor>
  </Styles>
);

export default RichEditor;