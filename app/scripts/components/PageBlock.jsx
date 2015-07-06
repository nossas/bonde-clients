var PageBlockColumn = require("./PageBlockColumn.jsx")

var PageBlock = React.createClass({
  render: function(){
    var columns = this.props.block.columns;

    return(
      <div className="clearfix mb4">
        {
          columns.map(function(column){
            return <PageBlockColumn column={column} />
          })
        }
      </div>
    )
  }
});

module.exports = PageBlock;
