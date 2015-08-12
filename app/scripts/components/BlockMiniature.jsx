import React from 'react'
import classnames from 'classnames'

export default class BlockMiniature extends React.Component {
  handleClick(){
    this.props.onClick(this.props.layout)
  }

  render(){
    const { bgClass, selectedLayout, layout } = this.props
    return React.createElement('div', {className: "col col-6 px3 mb3", onClick: ::this.handleClick},
      React.createElement('div', {className: classnames("clearfix", "border", (layout.length > 1 ? "py2" : "p2"), "button", "block", (selectedLayout == layout ? "bg-silver" : "bg-white")), style: {lineHeight: '50%'}}, ...layout.map((size) => {
        return React.createElement('div', {className: classnames("clearfix", "col", "col-" + size.lg_size, (layout.length > 1 ? "px2" : ""))},
          React.createElement('div', {className: "col col-12 mb2 bg-blue"},
            React.createElement('br'),
            React.createElement('br'),
            React.createElement('br'),
            React.createElement('br'),
            React.createElement('br'),
            React.createElement('br'),
            React.createElement('br')
          ),
          React.createElement('div', {className: "col col-12 mb2 bg-blue"}, React.createElement('br')),
          React.createElement('div', {className: "col col-12 mb2 bg-blue"}, React.createElement('br')),
          React.createElement('div', {className: "col col-12 mb2 bg-blue"}, React.createElement('br')),
          React.createElement('div', {className: "col col-12 bg-blue"}, React.createElement('br'))
        )
      }))
    )
  }
}
