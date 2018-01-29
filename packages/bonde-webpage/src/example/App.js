import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import qs from 'querystring'
import { selectPage } from '../package/actions'
import { createPage } from '../package/components/page'
import logo from './logo.svg'
import './App.css'
import OverlayWidget from '../package/components/overlay'

const WidgetDefault = ({ widget }) => (
  <div>
    <p>{widget.kind}</p>
  </div>
)

const RenderOverlay = ({ widget }) => (
  <OverlayWidget onClick={() => console.log(`clique overlay #${widget.id}`)}>
    {`Clique aqui para configurar ${widget.kind}`}
  </OverlayWidget>
)

const plugins = [
  { kind: 'draft', plugin: WidgetDefault, renderOverlay: RenderOverlay },
  { kind: 'form', plugin: WidgetDefault, renderOverlay: RenderOverlay },
  { kind: 'content', plugin: WidgetDefault },
  { kind: 'donation', plugin: WidgetDefault },
  { kind: 'pressure', plugin: WidgetDefault }
]

const Mobilization = createPage({
  plugins,
  relationship: (block, widgets) => widgets.filter(
    widget => widget.block_id === block.id
  )
})

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { loading: false }
  }

  async fetch (slug) {
    const apiUrl = 'http://localhost:3000'
    const options = {
      params: {
        slug
      },
      paramsSerializer: (params) => {
        return qs.stringify(params)
      }
    }

    this.setState({ loading: true })
    const { data: mobilizations } = await axios.get(`${apiUrl}/mobilizations`, options)
    const { data: blocks } = await axios.get(`${apiUrl}/blocks`, options)
    const { data: widgets } = await axios.get(`${apiUrl}/widgets`, options)
    
    this.props.selectPage(mobilizations[0], blocks, widgets)
    this.setState({ loading: false })
  }

  render() {
    const { meta, blocks, widgets } = this.props
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <p>
            <button onClick={() => this.fetch('minhabeaga')}>
              Carregar mobilizações
            </button>
          </p>
        </header>
        <div className="App-intro">
          {this.state.loading && <p>Carregando...</p>}
          {!this.state.loading && meta && (
            <Mobilization blocks={blocks} widgets={widgets} />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => state.mobilizations

const mapDispatchToProps = { selectPage }

export default connect(mapStateToProps, mapDispatchToProps)(App)
