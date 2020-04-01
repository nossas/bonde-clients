import React from 'react'
import { useSession } from 'bonde-core-tools'
import CommunitiesGadget from './CommunitiesGadget'
import TrendingMobilizationsGadget from './TrendingMobilizationsGadget'

const HomePage = () => {
  const { user } = useSession()

  return (
    <div className='xs-6'>
      <CommunitiesGadget />
      <TrendingMobilizationsGadget user={user} />
    </div>
  )
}

export default HomePage
