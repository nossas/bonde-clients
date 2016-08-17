import React, { PropTypes } from 'react'

const parseTarget = target => {
  const targetSplit = target.split('<')
  return { name: targetSplit[0].trim(), email: targetSplit[1].replace('>', '') }
}


const TargetList = ({ targets }) => {
  // TODO: add sheet css
  const targetListContainerStyle = {
    overflowX: 'auto',
    height: '75px'
  }
  const targetListStyle = {
    backgroundColor: '#eee'
  }
  const targetItemStyle = {
    width: '140px',
    height: '35px',
    float: 'left'
  }
  const targetLabelStyle = {
    color: '#4c4c4c',
    fontSize: '.8em',
    marginTop: '5px',
    marginBottom: '12px'
  }

  return (
    <div className="target-list px2 py1" style={targetListStyle}>
      <p className="bold" style={targetLabelStyle}>Quem você vai pressionar</p>
      <div style={targetListContainerStyle} className="clearfix">
        <div style={{ width: `${180 * targets.length}px` }}>
          {/* TODO: Change HTML by TargetListItem */}
          {/*<div className='target-item py1 px2 mr1 bg-white rounded' style={targetItemStyle}>
            <img className='left circle mr2' src={target.image} height="55" width="55" />
            <p className="black h6">
              <span className="bold flex">{target.name}</span>
              <span>{target.office}</span>
            </p>
          </div>*/}
          {targets.map(obj => {
            const target = parseTarget(obj)
            return (
              <div className='target-item py1 px2 mr1 bg-white rounded' style={targetItemStyle}>
                <p className="black h6">
                  <span className="bold flex">{target.name}</span>
                  <span>{target.email}</span>
                </p>
              </div>
            )
          })}
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
