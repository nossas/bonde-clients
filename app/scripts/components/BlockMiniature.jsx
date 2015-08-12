import React from 'react'
import classnames from 'classnames'

export default class BlockMiniature extends React.Component {
  handleClick(){
    this.props.onClick(this.props.layout)
  }

  render(){
    const { bgClass, selectedLayout, layout } = this.props
    return(
      <div className="col col-3 mb3 px1" onClick={::this.handleClick}>
        <div className={classnames("clearfix", "border", "p1", "button", "button-transparent", "block", "bg-white", "rounded",
          selectedLayout == layout ? "is-active" : null)}>
          <div className="mxn1">
            {layout.map((size, index) => {
              return(
                <div className={classnames("clearfix", "px1", "col", "col-" + size.lg_size)} key={index}>
                  <div className="col col-12 mb1 bg-darken-2" style={{height: "50px"}} />
                  <div className="col col-12 mb1 bg-darken-2" style={{height: "5px"}} />
                  <div className="col col-12 mb1 bg-darken-2" style={{height: "5px"}} />
                  <div className="col col-12 mb1 bg-darken-2" style={{height: "5px"}} />
                  <div className="col col-12 bg-darken-2" style={{height: "5px"}} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}
