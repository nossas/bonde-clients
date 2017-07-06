import React, { Component } from 'react'

import * as paths from '~client/paths'
import { BrowsableList, BrowsableListItem } from '~client/components/navigation/browsable-list'
import { PageTabLayout } from '~client/mobilizations/components'

class TemplatesChoosePage extends Component {

  render () {
    const {
      mobilization,
      templatesGlobal,
      templatesCustomLength,
      createMobilizationFromTemplate,
      location
    } = this.props
    
    return (
      <PageTabLayout {...{ location }}>
        <div className='choose-menu-page col-12'>
          <h3 className='h1 mt0 mb3 center'>Como você deseja começar?</h3>
          <BrowsableList>
            {templatesGlobal && templatesGlobal.map(template => (
              <BrowsableListItem
                key={`index-${template.id}`}
                leftIcon={template.goal}
                title={template.name}
                onClick={() => {
                  createMobilizationFromTemplate({ mobilization, template })
                }}
              />
            ))}
            <BrowsableListItem
              leftIcon='columns'
              title='Meus templates'
              subtitle={templatesCustomLength}
              path={paths.mobilizationTemplatesChooseCustomList(mobilization)}
            />
          </BrowsableList>
        </div>
      </PageTabLayout>
    )
  }
}

export default TemplatesChoosePage
