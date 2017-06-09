import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import * as array from '~client/utils/array'

if (require('exenv').canUseDOM) require('./index.scss')

const parseTarget = target => {
  const targetSplit = target.split('<')
  const valid = targetSplit.length === 2
  return valid ? { name: targetSplit[0].trim(), email: targetSplit[1].replace('>', '') } : null
}

class TargetList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      targets: props.targets
    }
  }

  componentDidMount() {
    //
    // to works on nossas/bonde-cache, make an async method
    // to shuffle the pressure targets on the client-side.
    //
    if (require('exenv').canUseDOM) {
      const { targets } = this.props

      setTimeout(() => {
        this.setState({ targets: array.shuffle(targets) })
      }, 0)
    }
  }

  render() {
    const { targets } = this.state

    return (
      <div className='target-list px2 py1'>
        <p className='target-list-label bold'>
          <FormattedMessage
            id='pressure-widget--target-list.label'
            defaultMessage='Quem você vai pressionar ({targetsCount} alvos)'
            values={{ targetsCount: String(array.clean(targets).length) }}
          />
        </p>
        <div className='target-list-container clearfix'>
          <div className='target-list-wrapper clearfix'>
            {targets.length > 0 && targets.map((obj, index) => {
              const target = parseTarget(obj)
              return !target ? null : (
                <div
                  key={`target-item-${index}`}
                  className='target-item left py1 px2 mr1 bg-white rounded'
                >
                  <p className='black h6 m0'>
                    <span className='bold flex'>{target.name}</span>
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
}

TargetList.propTypes = {
  targets: PropTypes.arrayOf(PropTypes.string)
}

TargetList.defaultProps = {
  targets: []
}

export default TargetList
