import React from 'react'
import { I18n } from 'react-i18next'
import { useSession } from 'bonde-core-tools'
import CommunitiesGadget from './CommunitiesGadget'
import TrendingMobilizationsGadget from './TrendingMobilizationsGadget'

const HomePage = () => {
  const { user } = useSession()

  return (
    <I18n ns='home'>
      {t => (
        <div className='xs-6'>
          <CommunitiesGadget />
          <TrendingMobilizationsGadget user={user} />
        </div>
      )}
    </I18n>
  )
}

export default HomePage
