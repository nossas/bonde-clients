import React, { PropTypes } from 'react'

import { SettingsPageLayout, SettingsPageContentLayout } from '~components/layout'
import { SettingsMenu, ForceDownloadViaAjax } from '~community/components'

const CommunitySettingsReportPage = ({ location }) => (
  <SettingsPageLayout>
    <SettingsMenu {...{ location }} />
    <SettingsPageContentLayout>
      <div className='table caps bold mb2 darkengray h6'>
        <i className='fa fa-file-excel-o darkengray table-cell align-middle h2' />
        <span className='table-cell align-middle pl1'>Exportar</span>
      </div>

      <p className='h5 mb2 darkengray'>
        Clique no botão abaixo para baixar o relatório completo da comunidade.
      </p>
      <ForceDownloadViaAjax
        title='Baixar relatório completo da comunidade'
        onClick={() => { console.info('[TODO] Baixar relatório completo da comunidade') }}
        className='btn bg-blacker white rounded py2 px3 h4'
      />
    </SettingsPageContentLayout>
  </SettingsPageLayout>
)

CommunitySettingsReportPage.propTypes = {
  location: PropTypes.object.isRequired
}

export default CommunitySettingsReportPage
