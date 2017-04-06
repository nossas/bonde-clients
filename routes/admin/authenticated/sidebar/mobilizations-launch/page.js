import React from 'react'

import { PageCentralizedLayout, PageCentralizedLayoutTitle } from '~client/components/layout'
import { PageDomain } from '~client/mobilizations/components'

const MobilizationsLaunchPage = props => (
  <PageCentralizedLayout>
    <PageCentralizedLayoutTitle>
      Lançando sua mobilização
    </PageCentralizedLayoutTitle>

    <PageDomain {...props} buttonText='Continuar' />
  </PageCentralizedLayout>
)

export default MobilizationsLaunchPage
