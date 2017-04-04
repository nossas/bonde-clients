import React from 'react'

import { FlatForm } from '~client/ux/components'
import { PageCentralizedLayout, PageCentralizedLayoutTitle } from '~client/components/layout'
import { FormDomain } from '~client/mobilizations/components'

const MobilizationsLaunchPage = ({ mobilization, fields, ...formProps }) => {
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

      <FormDomain
        FormComponent={FlatForm}
        formProps={formProps}
        fields={fields}
        mobilization={mobilization}
      />
    </PageCentralizedLayout>
  )
}

export default MobilizationsLaunchPage
