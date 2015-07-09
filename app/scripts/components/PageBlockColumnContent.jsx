import React from 'react'

export default class PageBlockColumnContent extends React.Component {
  render(){
    var column = this.props.column

    return(
      <div>
        <textarea className="full-width field-light">
          {column.content}
        </textarea>
        <button className="button bg-blue right">
          Salvar
        </button>
      </div>
    )
  }
}
