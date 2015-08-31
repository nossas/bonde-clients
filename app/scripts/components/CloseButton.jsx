import React from 'react'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'

@reactMixin.decorate(Navigation)

export default class Color extends React.Component {
  handleClick() {
    const { dirty, path } = this.props
    if (!dirty || (dirty && confirm("Ao sair sem salvar você perderá suas modificações. Deseja sair sem salvar?"))) {
      if (path) {
        this.transitionTo(path)
      } else {
        this.goBack()
      }
    }
  }

  render(){
    return(
      <div className="absolute right-0 top-0 muted h2 p2">
        <button className="button button-transparent" onClick={::this.handleClick}>
          <i className="fa fa-close" />
        </button>
      </div>
    )
  }
}
