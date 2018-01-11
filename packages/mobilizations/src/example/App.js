import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadMobilizations, loadWidgets } from '../package/actions'
import { Form, Listable } from './components'
import logo from './logo.svg'
import './App.css'

class App extends Component {

  constructor (props) {
    super(props)
    this.state = { current: undefined }
  }

  load (keyName) {
    if (keyName === 'mobilizations') {
      this.props.load([
        { id: 1, name: 'Minha Beaga' },
        { id: 2, name: 'Tarifa Zero' }
      ])
    }
    if (keyName === 'widgets') {
      this.props.loadWidgets([
        { id: 1, kind: 'Doação' },
        { id: 2, kind: 'Conteúdo' },
        { id: 3, kind: 'Formulário' }
      ])
    }
  }

  createOrUpdate ({ id, ...values }) {
    if (!id) {
      let { mobilizations: { data } } = this.props
      data.sort((a, b) => b.id - a.id)
      const lastObj = data[0]
      this.props.create({ id: lastObj.id + 1, ...values })
    } else {
      this.props.update({ id, ...values })
    }
  }

  selectItem (obj) {
    this.setState({ current: obj })
  }

  render() {
    const {
      mobilizations: {
        mobilizations: { data: mobilizations },
        widgets: { data: widgets }
      }
    } = this.props

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <p>
            <button onClick={() => this.load('mobilizations')}>Carregar mobilizações</button>
            <button onClick={() => this.load('widgets')}>Carregar widgets</button>
          </p>
        </header>
        <div className="App-intro">
          <Form
            submit={this.createOrUpdate.bind(this)}
            initialValues={this.state.current}
          />
          <hr />
          <div>
            <h2>Mobilizações</h2>
            <Listable data={mobilizations} onSelectItem={this.selectItem.bind(this)} />
          </div>
          <div>
            <h2>Widgets</h2>
            <Listable data={widgets} fieldName='kind' />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  mobilizations: state.mobilizations
})

const mapDispatchToProps = {
  load: loadMobilizations,
  loadWidgets,
  create: () => {},
  update: () => {},
  remove: () => {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
