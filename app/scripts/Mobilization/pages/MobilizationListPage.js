import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classnames from 'classnames'

import * as Paths from '../../Paths'
import { Loading } from '../../components'
import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from '~Layout'
import {
  MobilizationList,
  MobilizationListHeader,
  MobilizationListItemsHeader,
  MobilizationListItem,
  MobilizationListItemAvatar,
  MobilizationListItemName,
  MobilizationListItemCreatedAt,
  MobilizationListItemUsers,
  MobilizationListItemFundRaising,
  MobilizationListItemMore
}  from '~Mobilization/components'
import {
  setCurrentMobilizationId,
  setMobilizationMoreMenuActiveIndex
} from '~Mobilization/MobilizationActions'

export class MobilizationListPage extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(setCurrentMobilizationId(null))
    dispatch(setMobilizationMoreMenuActiveIndex(undefined))
  }

  render() {
    const {
      mobilization: { data: mobilizations, loading, loaded },
      mobilizationMoreMenuActiveIndex,
      dispatch
    } = this.props

    return (
      <SettingsPageLayout>
        <SettingsPageMenuLayout title="Suas Mobilizações">
          <MobilizationListHeader {...this.props} />
        </SettingsPageMenuLayout>
        {(
          loading && !loaded ? <Loading /> :
          <MobilizationList>
            <MobilizationListItemsHeader />

            {mobilizations && mobilizations.map((mobilization, index) => (
              <MobilizationListItem
                key={`mobilization-${mobilization.id}`}
                className={classnames({ 'z2': mobilizationMoreMenuActiveIndex === index })}
              >
                <Link
                  className="gray20"
                  to={Paths.editMobilization(mobilization.id)}
                >
                  <MobilizationListItemAvatar {...mobilization} />

                  <div className="list-item-table-container overflow-hidden">
                    <MobilizationListItemName {...mobilization} />
                    <MobilizationListItemCreatedAt {...mobilization} />
                    <MobilizationListItemUsers {...mobilization} />
                    <MobilizationListItemFundRaising {...mobilization} />
                  </div>
                </Link>
                <MobilizationListItemMore {...this.props} mobilization={mobilization} index={index} />
              </MobilizationListItem>
            ))}
          </MobilizationList>
        )}
        {
          typeof mobilizationMoreMenuActiveIndex !== 'undefined' && (
            <div
              className="mobilization-list-more-menu-cancel-overlay z1"
              style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }}
              onClick={() => { dispatch(setMobilizationMoreMenuActiveIndex(undefined)) }}
            />
          )
        }
      </SettingsPageLayout>
    )
  }
}

MobilizationListPage.propTypes = {
  data: PropTypes.array,
  loaded: PropTypes.bool,
  loading: PropTypes.bool,
  dispatch: PropTypes.func
}

const mapStateToProps = state => ({
  mobilizationMoreMenuActiveIndex: state.mobilization.mobilizationMoreMenuActiveIndex
})

export default connect(mapStateToProps)(MobilizationListPage)
