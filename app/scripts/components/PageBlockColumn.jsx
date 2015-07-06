var PageBlockColumnContent = require("./PageBlockColumnContent.jsx");

var PageBlockColumn = React.createClass({
  render: function(){
    var column = this.props.column;
    var className = "border p2 center col col-" + column.size;

    return(
      <div className={className}>
        <PageBlockColumnContent column={column} />
      </div>
    )
  }
});

module.exports = PageBlockColumn;
