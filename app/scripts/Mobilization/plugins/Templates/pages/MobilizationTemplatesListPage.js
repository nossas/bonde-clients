import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from '~Layout'
import { MobilizationsHeader } from '~Mobilization/components'
import MobilizationList from '~Mobilization/components/MobilizationList'
import {
  MobilizationListItem,
  MobilizationListItemAvatar,
  MobilizationListItemName,
  MobilizationListItemCreatedAt,
  MobilizationListItemCopyNumber,
  MobilizationListItemFundRaising,
  MobilizationListItemMore
}  from '~Mobilization/components/MobilizationList/MobilizationListItem'
import {
  MobilizationListItemHeader,
  MobilizationListItemHeaderName,
  MobilizationListItemHeaderCreatedAt,
  MobilizationListItemHeaderCopyNumber,
  MobilizationListItemHeaderFundRaising
}  from '~Mobilization/components/MobilizationList/MobilizationListItemHeader'
import {
  setCurrentMobilizationId,
  setMobilizationMoreMenuActiveIndex
} from '~Mobilization/MobilizationActions'

export class MobilizationTemplatesListPage extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(setMobilizationMoreMenuActiveIndex(undefined))
  }

  render() {
    const { dispatch, mobilizationMoreMenuActiveIndex } = this.props
    const mobilizations = [
      {
        body_font: null,
        color_scheme: "meurio-scheme",
        created_at: "2016-08-23T18:23:37.325-03:00",
        custom_domain: "www.escolainclusiva.meurio.org.br",
        facebook_share_description: "Pela convocação imediata dos mediadores de alunos com deficiência",
        facebook_share_image: "https://s3.amazonaws.com/hub-central/uploads/1476194369_Escolas-inclusivas_34.png",
        facebook_share_title: "Pressione a Prefeitura do Rio por escolas inclusivas de verdade!",
        goal: "Pelo direito das 13mil crianças com deficiência  na rede municipal aos agentes de apoio à educação especial",
        google_analytics_code: null,
        header_font: null,
        id: 219,
        name: "Por escolas inclusivas de verdade no Rio",
        organization_id: 8,
        slug: "175-por-escolas-inclusivas-de-verdade-no-rio",
        twitter_share_text: "Acabei de colaborar com Por escolas inclusivas de verdade no Rio. Participe você também: ",
        updated_at: "2016-10-11T10:59:37.610-03:00",
        user_id: 35,
        copy_number: 1223
      },
      {
        body_font: null,
        color_scheme: "meurio-scheme",
        created_at: "2016-08-23T18:23:37.325-03:00",
        custom_domain: "www.escolainclusiva.meurio.org.br",
        facebook_share_description: "Pela convocação imediata dos mediadores de alunos com deficiência",
        facebook_share_image: "https://s3.amazonaws.com/hub-central/uploads/1476194369_Escolas-inclusivas_34.png",
        facebook_share_title: "Pressione a Prefeitura do Rio por escolas inclusivas de verdade!",
        goal: "Pelo direito das 13mil crianças com deficiência  na rede municipal aos agentes de apoio à educação especial",
        google_analytics_code: null,
        header_font: null,
        id: 220,
        name: "Por escolas inclusivas de verdade no Rio",
        organization_id: 8,
        slug: "175-por-escolas-inclusivas-de-verdade-no-rio",
        twitter_share_text: "Acabei de colaborar com Por escolas inclusivas de verdade no Rio. Participe você também: ",
        updated_at: "2016-10-11T10:59:37.610-03:00",
        user_id: 35,
        copy_number: 1223
      },
      {
        body_font: null,
        color_scheme: "meurio-scheme",
        created_at: "2016-08-23T18:23:37.325-03:00",
        custom_domain: "www.escolainclusiva.meurio.org.br",
        facebook_share_description: "Pela convocação imediata dos mediadores de alunos com deficiência",
        facebook_share_image: "https://s3.amazonaws.com/hub-central/uploads/1476194369_Escolas-inclusivas_34.png",
        facebook_share_title: "Pressione a Prefeitura do Rio por escolas inclusivas de verdade!",
        goal: "Pelo direito das 13mil crianças com deficiência  na rede municipal aos agentes de apoio à educação especial",
        google_analytics_code: null,
        header_font: null,
        id: 221,
        name: "Por escolas inclusivas de verdade no Rio",
        organization_id: 8,
        slug: "175-por-escolas-inclusivas-de-verdade-no-rio",
        twitter_share_text: "Acabei de colaborar com Por escolas inclusivas de verdade no Rio. Participe você também: ",
        updated_at: "2016-10-11T10:59:37.610-03:00",
        user_id: 35,
        copy_number: 1223
      },
      {
        body_font: null,
        color_scheme: "meurio-scheme",
        created_at: "2016-08-23T18:23:37.325-03:00",
        custom_domain: "www.escolainclusiva.meurio.org.br",
        facebook_share_description: "Pela convocação imediata dos mediadores de alunos com deficiência",
        facebook_share_image: "https://s3.amazonaws.com/hub-central/uploads/1476194369_Escolas-inclusivas_34.png",
        facebook_share_title: "Pressione a Prefeitura do Rio por escolas inclusivas de verdade!",
        goal: "Pelo direito das 13mil crianças com deficiência  na rede municipal aos agentes de apoio à educação especial",
        google_analytics_code: null,
        header_font: null,
        id: 222,
        name: "Por escolas inclusivas de verdade no Rio",
        organization_id: 8,
        slug: "175-por-escolas-inclusivas-de-verdade-no-rio",
        twitter_share_text: "Acabei de colaborar com Por escolas inclusivas de verdade no Rio. Participe você também: ",
        updated_at: "2016-10-11T10:59:37.610-03:00",
        user_id: 35,
        copy_number: 1223
      },
      {
        body_font: null,
        color_scheme: "meurio-scheme",
        created_at: "2016-08-23T18:23:37.325-03:00",
        custom_domain: "www.escolainclusiva.meurio.org.br",
        facebook_share_description: "Pela convocação imediata dos mediadores de alunos com deficiência",
        facebook_share_image: "https://s3.amazonaws.com/hub-central/uploads/1476194369_Escolas-inclusivas_34.png",
        facebook_share_title: "Pressione a Prefeitura do Rio por escolas inclusivas de verdade!",
        goal: "Pelo direito das 13mil crianças com deficiência  na rede municipal aos agentes de apoio à educação especial",
        google_analytics_code: null,
        header_font: null,
        id: 223,
        name: "Por escolas inclusivas de verdade no Rio",
        organization_id: 8,
        slug: "175-por-escolas-inclusivas-de-verdade-no-rio",
        twitter_share_text: "Acabei de colaborar com Por escolas inclusivas de verdade no Rio. Participe você também: ",
        updated_at: "2016-10-11T10:59:37.610-03:00",
        user_id: 35,
        copy_number: 1223
      },
      {
        body_font: null,
        color_scheme: "meurio-scheme",
        created_at: "2016-08-23T18:23:37.325-03:00",
        custom_domain: "www.escolainclusiva.meurio.org.br",
        facebook_share_description: "Pela convocação imediata dos mediadores de alunos com deficiência",
        facebook_share_image: "https://s3.amazonaws.com/hub-central/uploads/1476194369_Escolas-inclusivas_34.png",
        facebook_share_title: "Pressione a Prefeitura do Rio por escolas inclusivas de verdade!",
        goal: "Pelo direito das 13mil crianças com deficiência  na rede municipal aos agentes de apoio à educação especial",
        google_analytics_code: null,
        header_font: null,
        id: 224,
        name: "Por escolas inclusivas de verdade no Rio",
        organization_id: 8,
        slug: "175-por-escolas-inclusivas-de-verdade-no-rio",
        twitter_share_text: "Acabei de colaborar com Por escolas inclusivas de verdade no Rio. Participe você também: ",
        updated_at: "2016-10-11T10:59:37.610-03:00",
        user_id: 35,
        copy_number: 1223
      },
    ]
    return (
      <SettingsPageLayout>
        <SettingsPageMenuLayout title="Suas Mobilizações@@@@@">
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

            {mobilizations && mobilizations.map((mobilization, index) => (
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
                <MobilizationListItemMore {...this.props} mobilization={mobilization} index={index} />
              </MobilizationListItem>
            ))}
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
  mobilizationMoreMenuActiveIndex: state.mobilization.mobilizationMoreMenuActiveIndex
})

export default connect(mapStateToProps)(MobilizationTemplatesListPage)
