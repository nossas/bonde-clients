import React from 'react'
import { Text } from 'bonde-styleguide'
import ImageColumn from './ImageColumn'
import TableCardGadget from './TableCardGadget'

const communities = [
  {
    image: 'https://goo.gl/nBC6NB',
    text: {
      title: 'Minha Sampa',
      description: 'Nós aproximamos os cidadãos das decisões que definem o rumo da cidade de São Paulo.'
    }
  },
  {
    image: 'https://goo.gl/nAtki5',
    text: {
      title: 'Meu Rio',
      description: 'Nós aproximamos os cidadãos das decisões que definem o rumo da cidade do Rio de Janeiro.'
    }
  },
  {
    image: 'https://goo.gl/8kqLZf',
    text: {
      title: 'CPI dos Ônibus pra valer',
      description: 'Prorrogar a CPI dos ônibus por mais quatro meses.'
    }
  }
]

const columns = [
  {
    field: 'image',
    render: ImageColumn
  },
  {
    field: 'text',
    render: ({ value }) => (
      <React.Fragment>
        <Text
          fontSize={16}
          fontWeight={900}
          lineHeight={1.25}
        >
          {value.title}
        </Text>
        <Text
          fontSize={13}
          lineHeight={1.54}
          color='#4a4a4a'
        >
          {value.description}
        </Text>
      </React.Fragment>
    )
  },
]

const CommunityList = () => (
  <TableCardGadget
    data={communities}
    columns={columns}
    title='Minhas comunidades'
    emptyIcon='community'
    emptyText='Crie uma comunidade para começar a causar'
  />
)

export default CommunityList
