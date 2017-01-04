import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classnames from 'classnames'

import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from '../../../components/Layout'
import MobilizationList from '../../../scripts/Mobilization/components/MobilizationList'
import {
  MobilizationListItem,
  MobilizationListItemAvatar,
  MobilizationListItemName,
  MobilizationListItemCreatedAt,
  MobilizationListItemUsers,
  MobilizationListItemFundRaising,
  MobilizationListItemMore,
  MobilizationListItemMoreMenu,
  MobilizationListItemMoreMenuAction
}  from '../../../scripts/Mobilization/components/MobilizationList/MobilizationListItem'
import {
  MobilizationListItemHeader,
  MobilizationListItemHeaderName,
  MobilizationListItemHeaderCreatedAt,
  MobilizationListItemHeaderUsers,
  MobilizationListItemHeaderFundRaising
}  from '../../../scripts/Mobilization/components/MobilizationList/MobilizationListItemHeader'
import { MobilizationsHeader } from '../../../scripts/Mobilization/components'
import * as Paths from '../../../scripts/Paths'

import { unselect, toggleMenu } from '../action-creators'
import * as MobilizationSelectors from '../selectors'


export class ListMobilizationPage extends Component {

  componentDidMount() {
    const { unselect, toggleMenu } = this.props
    unselect()
    toggleMenu(undefined)
  }

  render() {

    const {
      location,
      mobilizations,
      menuActiveIndex,
      toggleMenu
    } = this.props

    return (
      <SettingsPageLayout>
        <SettingsPageMenuLayout title="Suas Mobilizações">
          <MobilizationsHeader location={location} />
        </SettingsPageMenuLayout>
        <SettingsPageContentLayout containerClassName="lg-col-12">
          <MobilizationList>
            <MobilizationListItemHeader>
              <MobilizationListItemHeaderName />
              <MobilizationListItemHeaderCreatedAt />
              <MobilizationListItemHeaderUsers />
              <MobilizationListItemHeaderFundRaising />
            </MobilizationListItemHeader>

            {mobilizations && mobilizations.map((mobilization, index) => (
              <MobilizationListItem
                key={`mobilization-${mobilization.id}`}
                className={classnames({ 'z2': menuActiveIndex === index })}
              >
                <Link className="gray20" to={Paths.editMobilization(mobilization.id)}>
                  <MobilizationListItemAvatar {...mobilization} />

                  <div className="list-item-table-container overflow-hidden">
                    <MobilizationListItemName {...mobilization} />
                    <MobilizationListItemCreatedAt {...mobilization} />
                    <MobilizationListItemUsers {...mobilization} />
                    <MobilizationListItemFundRaising {...mobilization} />
                  </div>
                </Link>
                <MobilizationListItemMore onClick={toggleMenu} index={index}>
                  <MobilizationListItemMoreMenu active={menuActiveIndex === index}>
                    <MobilizationListItemMoreMenuAction
                      componentClass="a"
                      target="_blank"
                      text="Abrir página"
                      path={Paths.mobilization(mobilization)}
                      icon="external-link"
                    />
                    <MobilizationListItemMoreMenuAction
                      text="Criar template"
                      path={Paths.mobilizationTemplatesCreate(mobilization)}
                      icon="star"
                    />
                  </MobilizationListItemMoreMenu>
                </MobilizationListItemMore>
              </MobilizationListItem>
            ))}
          </MobilizationList>
        </SettingsPageContentLayout>
      </SettingsPageLayout>
    )
  }
}

ListMobilizationPage.propTypes = {
  mobilizations: PropTypes.array.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  unselect: PropTypes.func.isRequired,
  menuActiveIndex: PropTypes.number,
  // Injected by react-router
  location: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  mobilizations: MobilizationSelectors.getList(state),
  menuActiveIndex: MobilizationSelectors.getMenuActiveIndex(state)
})

const mapActionCretorsToProps = { toggleMenu, unselect }

export default connect(mapStateToProps, mapActionCretorsToProps)(ListMobilizationPage)
