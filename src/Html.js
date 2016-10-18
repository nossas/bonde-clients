import React, {Component, PropTypes} from 'react'
import ReactDOMServer from 'react-dom/server'
import serialize from 'serialize-javascript'
import DocumentMeta from 'react-document-meta'

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.object,
    store: PropTypes.object
  }

  render() {
    const {assets, component, store} = this.props
    const content = ReactDOMServer.renderToString(component)

    return (
      <html lang="en-us">
        <head>
          <meta charSet="utf-8"/>
          { DocumentMeta.renderAsReact() }
          <link rel="shortcut icon" href="/favicon.ico" />
          {/* Load google fonts */}
          <link href="https://fonts.googleapis.com/css?directory=3&family=Bree+Serif:400%7CLibre+Baskerville:400%7CMerriweather+Sans:400%7CAbel:400%7CExo+2:400%7CCrimson+Text:400%7CJosefin+Sans:400%7CAsap:400%7CAnton:400%7CFira+Sans:400%7CPacifico:400%7CVarela+Round:400%7CQuicksand:400%7CKarla:400%7CSignika:400%7CCuprum:400%7CFrancois+One:400%7CPoiret+One:400%7CArchivo+Narrow:400%7CExo:400&subset=latin&text=+,.AIMSTWabcdefghijklmnopqrstuvwy" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?directory=3&family=Titillium+Web:400%7CPlayfair+Display:400%7CPT+Serif:400%7CMuli:400%7CIndie+Flower:400%7CBitter:400%7CInconsolata:400%7CDosis:400%7COxygen:400%7CFjalla+One:400%7CHind:400%7CCabin:400%7CCatamaran:400%7CLobster:400%7CYanone+Kaffeesatz:400%7CArvo:400%7CNoto+Serif:400%7CPoppins:400%7CNunito:400%7CUbuntu+Condensed:400&subset=latin&text=+,.AIMSTWabcdefghijklmnopqrstuvwy" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?directory=3&family=Open+Sans:400%7CRuslan+Display:400%7CLalezar:400%7CRoboto:400%7CSlabo+27px:400%7CLato:400%7CBaloo+Bhai:400%7COswald:400%7CRoboto+Condensed:400%7CMontserrat:400%7CRaleway:400%7CGidugu:400%7CPT+Sans:400%7CRoboto+Slab:400%7CLora:400%7COpen+Sans+Condensed:300%7CDroid+Sans:400%7CUbuntu:400%7CDavid+Libre:400&subset=latin&text=+,.AIMSTWabcdefghijklmnopqrstuvwy" rel="stylesheet" />

          {/* styles (will be present only in production with webpack extract text plugin) */}
          {Object.keys(assets.styles).map((style, i) =>
            <link href={assets.styles[style]} key={i} media="screen, projection"
                  rel="stylesheet" type="text/css"/>
          )}
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{__html: content}}/>
          <script src="/wysihtml/wysihtml-toolbar.min.js" />
          <script src="/wysihtml/advanced_and_extended.js" />
          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} />
          <script src={assets.javascript.main}/>
        </body>
      </html>
    )
  }
}
