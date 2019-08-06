### DataListCard - default text render

```js
import { DataListCard } from '../';

<DataListCard
  sectionTitle='Atividades recentes'
  fields={{ name: {}, email: {}, time: { align: 'right' } }}
  items={[
    {
      name: 'Susan Schwartz',
      email: 'george.lindgren@hotmail.com',
      time: '23/10 às 14h'
    },
    {
      name: 'Mattie Cunningham',
      email: 'graciela_rath@lakin.ca',
      time: '23/10 às 14h'
    },
    {
      name: 'Carrie Barton',
      email: 'abdiel.renner@jorge.biz',
      time: '23/10 às 14h'
    },
    {
      name: 'Jeff Rowe',
      email: 'elias_prosacco@boyle.com',
      time: '23/10 às 14h'
    },
    {
      name: 'Owen Padilla',
      email: 'ignatius.connelly@yahoo.com',
      time: '23/10 às 14h'
    }
  ]}
/>
```

### DataListCard - custom field render

```js
import { DataListCard } from '../';
import { Text, Image, Title } from '../../content';

<DataListCard
  sectionTitle='Atividades recentes'
  border={false}
  footerProps={{  }}
  fields={{
    image: {
      width: 40,
      render: (field) => (
        <Image
          src={field}
          width={40}
          height={40}
          rounded='50%'
        />
      )
    },
    text: {
      render: (field) => {
        return (
          <React.Fragment>
            <Text fontSize={16} fontWeight={900} lineHeight={1.25}>{field.title}</Text>
            <Text fontSize={13} lineHeight={1.54} color='#4a4a4a'>{field.description}</Text>
          </React.Fragment>
        )
      }
    }
  }}
  items={[
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
  ]}
/>
```

### DataListCard - with Footer

```js
import { DataListCard, Pagination } from '../';

const now = new Date();

<DataListCard
  sectionTitle='Atividades recentes'
  footerProps={{ justify: 'space-between' }}
  Footer={() => (
    <React.Fragment>
      <Title.H6 fontWeight='bold'>{now.toLocaleString('pt-BR')}</Title.H6>
      <Pagination pages={5} />
    </React.Fragment>
  )}
  fields={{ name: {}, email: {}, time: { align: 'right' } }}
  items={[
    {
      name: 'Susan Schwartz',
      email: 'susan.schwartz@email.com',
      time: '23/10 às 14h'
    },
    {
      name: 'Mattie Cunningham',
      email: 'mattie.cunningham@email.com',
      time: '23/10 às 14h'
    },
    {
      name: 'Carrie Barton',
      email: 'carrie.barton@email.com',
      time: '23/10 às 14h'
    },
    {
      name: 'Jeff Rowe',
      email: 'jeff.rowe@email.com',
      time: '23/10 às 14h'
    },
    {
      name: 'Owen Padilla',
      email: 'owen.padilla@email.com',
      time: '23/10 às 14h'
    },
    {
      name: 'Gabriel Laperouse',
      email: 'gabriel.laperouse@email.com',
      time: '23/10 às 14h'
    },
    {
      name: 'Bobette Szczygiel',
      email: 'bobette.szczygiel@email.com',
      time: '23/10 às 14h'
    }
  ]}
/>
```
