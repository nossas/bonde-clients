import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import * as Paths from '../../../../Paths'
import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from '../../../../../components/Layout'
import { MobilizationsHeader } from '../../../components'
import MobilizationList from '../../../components/MobilizationList'
import {
  MobilizationListItem,
  MobilizationListItemAvatar,
  MobilizationListItemName,
  MobilizationListItemCreatedAt,
  MobilizationListItemCopyNumber,
  MobilizationListItemFundRaising,
  MobilizationListItemMore,
  MobilizationListItemMoreMenu,
  MobilizationListItemMoreMenuAction
}  from '../../../components/MobilizationList/MobilizationListItem'
import {
  MobilizationListItemHeader,
  MobilizationListItemHeaderName,
  MobilizationListItemHeaderCreatedAt,
  MobilizationListItemHeaderCopyNumber,
  MobilizationListItemHeaderFundRaising
}  from '../../../components/MobilizationList/MobilizationListItemHeader'
import {
  setCurrentMobilizationId,
  setMobilizationMoreMenuActiveIndex
} from '../../../MobilizationActions'

export class MobilizationTemplatesListPage extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(setMobilizationMoreMenuActiveIndex(undefined))
  }

  render() {
    const { dispatch, mobilizationMoreMenuActiveIndex, mobilizationTemplates } = this.props

    return (
      <SettingsPageLayout>
        <SettingsPageMenuLayout title="Suas Mobilizações">
          <MobilizationsHeader {...this.props} />
        </SettingsPageMenuLayout>

        <SettingsPageContentLayout containerClassName="lg-col-12">
          <MobilizationList>
            <MobilizationListItemHeader>
              <MobilizationListItemHeaderName />
              <MobilizationListItemHeaderCreatedAt />
              <MobilizationListItemHeaderCopyNumber />
              <MobilizationListItemHeaderFundRaising />
            </MobilizationListItemHeader>

            {
              mobilizationTemplates.custom &&
              mobilizationTemplates.custom.map((mobilization, index) => (
                <MobilizationListItem
                  key={`mobilization-${mobilization.id}`}
                  className={classnames({ 'z2': mobilizationMoreMenuActiveIndex === index })}
                >
                  <MobilizationListItemAvatar {...mobilization} />

                  <div className="list-item-table-container overflow-hidden">
                    <MobilizationListItemName {...mobilization} />
                    <MobilizationListItemCreatedAt {...mobilization} />
                    <MobilizationListItemCopyNumber {...mobilization} />
                    <MobilizationListItemFundRaising {...mobilization} />
                  </div>

                  <MobilizationListItemMore dispatch={dispatch} index={index}>
                    <MobilizationListItemMoreMenu
                      active={mobilizationMoreMenuActiveIndex === index}
                    >
                      <MobilizationListItemMoreMenuAction
                        componentClass="div"
                        text="Editar"
                        path={Paths.mobilizationTemplatesUpdate(1)}
                        icon="pencil-square-o"
                      />
                      <MobilizationListItemMoreMenuAction
                        componentClass="div"
                        text="Remover"
                        path={Paths.mobilizationTemplatesDestroy(1)}
                        icon="trash-o"
                      />
                    </MobilizationListItemMoreMenu>
                  </MobilizationListItemMore>
                </MobilizationListItem>
              ))
            }
          </MobilizationList>
        </SettingsPageContentLayout>
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

MobilizationTemplatesListPage.propTypes = {}

const mapStateToProps = state => ({
  mobilizationMoreMenuActiveIndex: state.mobilization.mobilizationMoreMenuActiveIndex,
  mobilizationTemplates: state.mobilizationTemplates
})

export default connect(mapStateToProps)(MobilizationTemplatesListPage)
