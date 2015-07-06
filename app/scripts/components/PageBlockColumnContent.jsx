var PageBlockColumnContent = React.createClass({
  render: function(){
    var column = this.props.column;

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
});

module.exports = PageBlockColumnContent;
