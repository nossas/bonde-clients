import React from 'react'

// Global module dependencies
import * as paths from '~client/paths'
import { BrowsableList, BrowsableListItem } from '~components/navigation/browsable-list'
import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from '~components/layout'

const TemplateChoosePage = ({ mobilization, templatesGlobalLength, templatesCustomLength }) => (
  <SettingsPageLayout>
    <SettingsPageMenuLayout title='Crie um template a partir da mobilização' />
    <SettingsPageContentLayout containerClassName='mx-auto'>
      <div className='choose-menu-page col-12'>
        <h3 className='h1 mt0 mb3 center'>Como você deseja começar?</h3>
        <BrowsableList>
          <BrowsableListItem
            leftIcon='plus-square-o'
            title='Criar mobilização do zero'
            path={paths.createBlock(mobilization)}
          />
          <BrowsableListItem
            leftIcon='columns'
            title='Meus templates'
            subtitle={templatesCustomLength}
            path={paths.mobilizationTemplatesChooseCustomList(mobilization)}
          />
          <BrowsableListItem
            leftIcon='globe'
            title='Templates globais'
            subtitle={templatesGlobalLength}
            path={paths.mobilizationTemplatesChooseGlobalList(mobilization)}
          />
        </BrowsableList>
      </div>
    </SettingsPageContentLayout>
  </SettingsPageLayout>
)

export default TemplateChoosePage
