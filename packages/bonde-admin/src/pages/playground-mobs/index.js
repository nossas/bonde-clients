import React from 'react'
import { Mobilization } from '@mobs'
import { EditBlockWrapper, NewBlockButton } from '@mobs/ux'

// Datasets
import { blocks } from './dataset'

const CustomNewBlockButton = () => (
  <NewBlockButton
    onClick={() => console.log('Clicked on new block button!')}
  />
)

export default () => (
  <Mobilization
    editable
    newBlockButton={CustomNewBlockButton}
    linkTo={b => `block-${b.id}`}
    blocks={blocks}
    blockWrapper={EditBlockWrapper}
  />
)