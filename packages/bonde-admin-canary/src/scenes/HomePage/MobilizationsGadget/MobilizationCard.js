import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Header, Text } from 'bonde-components'

import Image from './Image'

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 20px 40px -14px rgba(0,0,0,0.25);
  overflow: hidden;
  width: 100%;
  cursor: pointer;

  &:hover {
    img, svg {
      filter: contrast(100%);
    }
  }
`

const CardContent = styled.div`
  padding: 18px;
`

const MobilizationCard = styled(({ className, mobilization, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <Card>
        <Image src={mobilization.facebookShareImage} title={mobilization.name} />
        <CardContent>
          <Header.h4>{mobilization.name}</Header.h4>
          <Text>Por {mobilization.community.name}</Text>
        </CardContent>
      </Card>
    </div>
  )
})`
  display: flex;
  flex-basis: 50%;

  @media only screen and (max-width: 768px) {
    flex-basis: 100%;
  }
`

MobilizationCard.propTypes = {
  mobilization: PropTypes.object.isRequired
}

export default MobilizationCard
