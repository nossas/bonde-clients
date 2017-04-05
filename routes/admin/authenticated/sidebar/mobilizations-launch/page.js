import React from 'react'

import { PageCentralizedLayout, PageCentralizedLayoutTitle } from '~client/components/layout'
import { PageDomain } from '~client/mobilizations/components'

const MobilizationsLaunchPage = props => {
  const { mobilization, fields, ...formProps } = props

  if (!mobilization.custom_domain) {
    formProps.buttonText = 'Lançar mobilização'
  } else {
    formProps.successMessage = `${mobilization.name} lançada com sucesso.`
  }

  formProps.titleText = 'Configure seu domínio'

  return (
    <PageCentralizedLayout>
      <PageCentralizedLayoutTitle>
        Lançando sua mobilização
      </PageCentralizedLayoutTitle>

      <PageDomain {...props} {...formProps} />
    </PageCentralizedLayout>
  )
}

export default MobilizationsLaunchPage
