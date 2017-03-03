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

const CommunitySettingsReportPage = ({ location }) => (
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
          onClick={() => { console.info('[TODO] Relatório de doações') }}
        />
        <SectionButton
          helperText={`
            Clique no botão abaixo para baixar o relatório
            de ações dos ativistas da comunidade.
          `}
          sectionTitle='Relatório de ações dos ativistas'
          buttonTitle='Baixar'
          onClick={() => { console.info('[TODO] Relatório de ações dos ativistas') }}
          wrapperStyle={{ marginTop: 40 }}
        />
        <SectionButton
          helperText={`
            Clique no botão abaixo para baixar o relatório consolidado
            de ações dos ativistas da comunidade.
          `}
          sectionTitle='Relatório consolidado de ações dos ativistas'
          buttonTitle='Baixar'
          onClick={() => { console.info('[TODO] Relatório consolidado de ações dos ativistas') }}
          wrapperStyle={{ marginTop: 40 }}
        />
      </div>
    </SettingsPageContentLayout>
  </SettingsPageLayout>
)

CommunitySettingsReportPage.propTypes = {
  location: PropTypes.object.isRequired
}

export default CommunitySettingsReportPage
