import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import {
  MobilizationListItem,
  MobilizationListItemAvatar,
  MobilizationListItemName,
  MobilizationListItemCreatedAt
} from '../../scripts/Mobilization/components/MobilizationList/MobilizationListItem'
import MobilizationList from '../../scripts/Mobilization/components/MobilizationList'
import { setSelectedIndex } from './SelectableListActions'

class SelectableList extends Component {
  render() {
    const { list, dispatch, selectedIndex, onClick, activeCondition } = this.props
    return (
      <div className="selectable-list col-12">
        <MobilizationList>
          {list.map((item, index) => (
            <MobilizationListItem
              key={`template-${index}`}
              onClick={() => { onClick(item, index) }}
              className={classnames(
                'border border-whisper',
                { 'border-pagenta': activeCondition(item, index) }
              )}
            >
              <MobilizationListItemAvatar {...item} />
              <MobilizationListItemName {...item} className="col-7" />
              <MobilizationListItemCreatedAt {...item} />
            </MobilizationListItem>
          ))}
        </MobilizationList>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedIndex: state.selectableList.selectedIndex
})

export default connect(mapStateToProps)(SelectableList)
