import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import qs from 'querystring'
import {
  loadMobilizations,
  loadBlocks,
  loadWidgets
} from '../package/actions'
import selectors from '../package/selectors'
import logo from './logo.svg'
import './App.css'

const { mobilizationSelector } = selectors('mobilizations')

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
    this.props.loadAll({ mobilizations, blocks, widgets })
    this.setState({ loading: false })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <p>
            <button onClick={() => this.fetch('minha-beaga')}>Carregar mobilizações</button>
          </p>
        </header>
        <div className="App-intro">
          {this.state.loading && <p>Carregando...</p>}
          {!this.state.loading && this.props.mobilization && <p>Vá ver o que aconteceu!</p>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  mobilization: mobilizationSelector(state)
})

const mapDispatchToProps = (dispatch) => ({
  loadAll: ({ mobilizations, blocks, widgets }) => {
    dispatch(loadMobilizations(mobilizations))
    dispatch(loadBlocks(blocks))
    dispatch(loadWidgets(widgets))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
