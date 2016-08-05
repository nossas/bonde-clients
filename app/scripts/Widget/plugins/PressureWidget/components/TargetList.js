import React, { PropTypes } from 'react'


const TargetList = ({ targets }) => {
  // TODO: add sheet css
  const targetListStyle = {
    backgroundColor: '#eee'
  }
  const targetItemStyle = {
    width: '200px',
    height: '75px',
    float: 'left'
  }

  return (
    <div className="target-list px2 py1" style={targetListStyle}>
      <p className="bold">Quem você pode pressionar</p>
      <div style={{overflowX: 'auto', height: '115px'}} className="clearfix">
        <div style={{ width: `${240 * targets.length}px` }}>
          {/* TODO: Change HTML by TargetListItem */}
          {targets.map(target => (
            <div className='target-item py1 px2 mr1 bg-white rounded' style={targetItemStyle}>
              <img className='left circle mr2' src={target.image} height="55" width="55" />
              <p className="black h6">
                <span className="bold flex">{target.name}</span>
                <span>{target.office}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

TargetList.propTypes = {
  targets: PropTypes.arrayOf({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    office: PropTypes.string.isRequired
  }),
}

TargetList.defaultProps = {
  targets: [],
}

export default TargetList
