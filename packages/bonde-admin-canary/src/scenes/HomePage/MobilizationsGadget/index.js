import React from 'react'
import styled from 'styled-components'
import { useQuery, useSession } from 'bonde-core-tools'
import { Header } from 'bonde-components'
import MobilizationCard from './MobilizationCard'
import mobilizationsLastUpdated from './query.graphql'
import LoadingCards from './Loading'

const Styles = styled.div`
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    height: 39px;
    margin-bottom: 15px;
  }

  ${Header.h5} {
    font-weight: bold;
    text-transform: uppercase;
  }
`

const GadgetWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (min-width: 769px) {
    ${MobilizationCard}:nth-child(odd) {
      padding: 0 .5rem 1rem 0;
    }
    ${MobilizationCard}:nth-child(even) {
      padding: 0 0 1rem .5rem;
    }
  }

  @media only screen and (max-width: 768px) {
    ${MobilizationCard} {
      padding-bottom: 1rem;
    }
  }
`

const MobilizationsGadget = () => {
  const { user } = useSession()
  const { data, loading } = useQuery(
    mobilizationsLastUpdated,
    { variables: { userId: user.id } }
  )

  if (loading) return <LoadingCards />

  const parse = m => ({
    id: m.id,
    name: m.name,
    goal: m.goal,
    facebookShareImage: m.facebook_share_image,
    customDomain: m.custom_domain,
    slug: m.slug,
    community: m.community
  })

  const { mobilizations } = data

  return (
    <Styles>
      <div className='header'>
        <Header.h5>Últimas atualizações</Header.h5>
      </div>
      <GadgetWrap>
        {(mobilizations).map(parse).map(mobilization =>
          <MobilizationCard key={mobilization.id} mobilization={mobilization} />
        )}
      </GadgetWrap>
    </Styles>
  )
}

export default MobilizationsGadget
