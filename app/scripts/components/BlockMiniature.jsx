import React from 'react'
import classnames from 'classnames'

export default class BlockMiniature extends React.Component {
  render(){
    const { bgClass, selectedSizes, sizes, onClick } = this.props
    return React.createElement('div', {className: "col col-6 px3 mb3", onClick: onClick, 'data-sizes': sizes}, 
      React.createElement('div', {className: classnames("clearfix", "border", (sizes.length > 1 ? "py2" : "p2"), "button", "block", (selectedSizes.toString() == sizes.toString() ? "bg-silver" : "bg-white")), style: {lineHeight: '50%'}}, ...sizes.map((size) => {
        return React.createElement('div', {className: classnames("clearfix", "col", "col-" + size, (sizes.length > 1 ? "px2" : ""))}, 
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
