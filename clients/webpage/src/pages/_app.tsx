import { createGlobalStyle, ThemeProvider } from 'styled-components'

import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-alignment-plugin/src/AlignmentButtonBar.css'
import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-color-plugin/src/ColorButton.css'
import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-color-plugin/src/DraggableColorPicker.css'
import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-embed-plugin/src/EmbedButton.css'
import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-embed-plugin/src/EmbedNode.css'
import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-font-size-plugin/src/FontSizeInput.css'
import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-grid-plugin/src/GridButtonBar.css'
import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-image-plugin/src/ImageEditLayer.css'
import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-image-plugin/src/ImageNode.css'
import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-link-plugin/src/LinkNode.css'
import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-list-plugin/src/ListButtonBar.css'
import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-components/src/modal/Modal.css'
import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-components/src/modal/ModalButton.css'
import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-components/src/modal/ModalContent.css'
import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-components/src/modal/ModalForm.css'
import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-components/src/tooltip/Tooltip.css'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .PlipForm {
    background-color: limegreen;
    padding: 2em;
  }
  .PlipForm label {
    text-transform: uppercase;
    color: #fff;
    display:block;
    font-weigth: strong;
    margin: 1.5em 0 1em;
  }

  .PlipForm input {
    cursor: pointer;
    border-radius: 2px;
    padding: 1rem;
    box-sizing: border-box;
    height: auto;
    border: 1px solid #eee;
    font-size: inherit;
    font-family: inherit;
    width: 100%;
  }

  .PlipForm select {
    border-radius: 2px;
    padding: 1rem;
    display: inline-block;
    height: inherit;
    background-color: #ffffff;
    box-sizing: border-box;
    border: 1px solid #eee;
    font-family: inherit;
    font-size: inherit;
    width: 100%;
  }

  .PlipForm button {
    background-color: rgba(0, 0, 0, 0.5);
    color: #ffffff;
    padding: 1rem;
    width: 100%;
    border-radius: 3px;
    border: 1px solid transparent;
    text-transform: uppercase;
    letter-spacing: 0;
    font-family: inherit;
    font-size: inherit;
    font-weight: bold;
    line-height: 1.125rem;
    -webkit-text-decoration: none;
    text-decoration: none;
    cursor: pointer;
    margin: 2em 0 0 0;
  }
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}