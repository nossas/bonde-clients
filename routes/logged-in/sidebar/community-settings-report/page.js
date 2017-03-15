import React, { PropTypes } from 'react'

import { SettingsPageLayout, SettingsPageContentLayout } from '~components/layout'
import { SettingsMenu, ForceDownloadViaAjax } from '~community/components'

const SectionButton = ({ sectionTitle, helperText, buttonTitle, onClick, wrapperStyle }) => (
  <div className='col md-col-12 lg-col-4 px2'>
    <div className='table caps bold mb2 darkengray h6'>
      <i className='fa fa-file-excel-o darkengray table-cell align-middle h2' />
      <span className='table-cell align-middle pl1'>
        {sectionTitle}
      </span>
    </div>

    <p className='h5 mb2 darkengray' style={{ minHeight: 42 }}>
      {helperText}
    </p>
    <ForceDownloadViaAjax
      title={buttonTitle}
      onClick={onClick}
      className='btn bg-blacker white rounded col-12 center'
      icon='download'
    />
  </div>
)

const CommunitySettingsReportPage = ({
  location,
  community,
  // Actions
  asyncDownloadActivistActions,
  asyncDownloadActivists,
  asyncDownloadDonations
}) => (
  <SettingsPageLayout>
    <SettingsMenu {...{ location }} />
    <SettingsPageContentLayout wrapClassName='lg-col-12'>
      <div className='mxn2'>
        <SectionButton
          helperText={`
            Clique no botão abaixo para baixar o relatório
            de doações da comunidade.
          `}
          sectionTitle='Relatório de doações'
          buttonTitle='Baixar'
          onClick={() => asyncDownloadDonations(community)}
        />
        <SectionButton
          helperText={`
            Clique no botão abaixo para baixar o relatório
            de ações dos ativistas da comunidade.
          `}
          sectionTitle='Relatório de ações dos ativistas'
          buttonTitle='Baixar'
          onClick={() => asyncDownloadActivistActions(community)}
        />
        <SectionButton
          helperText={`
            Clique no botão abaixo para baixar o relatório consolidado
            de ações dos ativistas da comunidade.
          `}
          sectionTitle='Relatório consolidado de ações dos ativistas'
          buttonTitle='Baixar'
          onClick={() => asyncDownloadActivists(community)}
        />
      </div>
    </SettingsPageContentLayout>
  </SettingsPageLayout>
)

CommunitySettingsReportPage.propTypes = {
  location: PropTypes.object.isRequired,
  community: PropTypes.object.isRequired,
  // Actions
  asyncDownloadActivistActions: PropTypes.func.isRequired,
  asyncDownloadActivists: PropTypes.func.isRequired,
  asyncDownloadDonations: PropTypes.func.isRequired
}

export default CommunitySettingsReportPage
