import React from 'react'
import { browserHistory } from 'react-router'

import * as paths from '~client/paths'
import { PageCentralizedLayout, PageCentralizedLayoutTitle } from '~client/components/layout'
import { Button } from '~client/ux/components'

if (require('exenv').canUseDOM) require('./page.scss')

const Heading = () => (
  <p className='heading'>
    Tudo pronto?<br />
    Agora é só lançar e contar pra todo mundo!
  </p>
)

const Image = ({ image }) => (
  <div className='image' style={{ backgroundImage: `url(${image})` }} />
)

const MobilizationsLaunchPage = ({ mobilization: { id, facebook_share_image: image } }) => {
  return (
    <PageCentralizedLayout>
      <PageCentralizedLayoutTitle>
        Chegou a hora
      </PageCentralizedLayoutTitle>

      <div className='mobilization-launch-end'>
        <Heading />
        <Image image={image} />
        <Button onClick={() => browserHistory.push(paths.editMobilization(id))}>
          Lançar mobilização
        </Button>
      </div>
    </PageCentralizedLayout>
  )
}

export default MobilizationsLaunchPage
