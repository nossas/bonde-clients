### Tooltip - simple example

```js
import { Flexbox2 } from '../../layout';
import { Image, Text } from '../../content';
import { Tooltip } from '../';

<Flexbox2 middle>
  <Tooltip nolock small Content={() => <Text fontSize={11} color='#FFF'><nobr>top-left</nobr></Text>} placement='top-left'>
  <Tooltip nolock small Content={() => <Text fontSize={11} color='#FFF'><nobr>top-middle</nobr></Text>} placement='top-middle'>
  <Tooltip nolock small Content={() => <Text fontSize={11} color='#FFF'><nobr>top-left</nobr></Text>} placement='top-right'>
  <Tooltip nolock small Content={() => <Text fontSize={11} color='#FFF'><nobr>right-top</nobr> (default)</Text>}>
  <Tooltip nolock small Content={() => <Text fontSize={11} color='#FFF'><nobr>right-middle</nobr></Text>} placement='right-middle'>
  <Tooltip nolock small Content={() => <Text fontSize={11} color='#FFF'><nobr>right-bottom</nobr></Text>} placement='right-bottom'>
  <Tooltip nolock small Content={() => <Text fontSize={11} color='#FFF'><nobr>bottom-right</nobr></Text>} placement='bottom-right'>
  <Tooltip nolock small Content={() => <Text fontSize={11} color='#FFF'><nobr>bottom-middle</nobr></Text>} placement='bottom-middle'>
  <Tooltip nolock small Content={() => <Text fontSize={11} color='#FFF'><nobr>bottom-left</nobr></Text>} placement='bottom-left'>
  <Tooltip nolock small Content={() => <Text fontSize={11} color='#FFF'><nobr>left-bottom</nobr></Text>} placement='left-bottom'>
  <Tooltip nolock small Content={() => <Text fontSize={11} color='#FFF'><nobr>left-middle</nobr></Text>} placement='left-middle'>
  <Tooltip nolock small Content={() => <Text fontSize={11} color='#FFF'><nobr>left-top</nobr></Text>} placement='left-top'>
    <Image
      src='https://goo.gl/f8fg1R'
      width={350}
      height={250}
      rounded='30px'
    />
  </Tooltip>
  </Tooltip>
  </Tooltip>
  </Tooltip>
  </Tooltip>
  </Tooltip>
  </Tooltip>
  </Tooltip>
  </Tooltip>
  </Tooltip>
  </Tooltip>
  </Tooltip>
</Flexbox2>
```


### Tooltip - advanced example

```js
import { Grid, Cell, Panel, Flexbox } from '../../layout';
import { DataListCard, Tooltip } from '../';
import { Button } from '../../form';
import { Image, Text, Title } from '../../content';

<Grid>
  <Cell size={[4, 4]}>
    <Tooltip
      nolock
      onClose={f => console.log('onClose')}
      minWidth={445}
      minHeight={226}
      Content={() => (
        <React.Fragment>
          <Title.H3 color='#FFFFFF' margin={{ bottom: 25 }}>
            Gerencie seu BONDE por aqui
          </Title.H3>
          <Text color='#FFFFFF' margin={{ bottom: 20 }}>
            Aqui em cima você confere em que página está e navega entre as principais
            sessões das suas comunidades e mobilizações.
          </Text>
          <Flexbox horizontal alignItems='middle'>
            <Title.H5 color='#FFFFFF'>
              1 / 5
            </Title.H5>
            <Button dark flat>Pular Tour</Button>
            <Button dark>Próxima Parada</Button>
          </Flexbox>
        </React.Fragment>
      )}
    >
      <Panel
        sectionTitle='Treending mobs'
        image='https://goo.gl/hggWmp'
        title='Cinzas dos Muros'
        description='Nossos muros têm voz, têm vida.'
        author='Por Minha Sampa'
        minHeight={300}
      />
    </Tooltip>
  </Cell>
  <Cell size={[8, 8]}>
    <DataListCard
      minHeight={300}
      sectionTitle='Atividades recentes'
      border={false}
      footerProps={{  }}
      fields={{
        image: {
          width: 40,
          render: field => <Image src={field} width={40} height={40} rounded='50%' />
        },
        text: {
          render: field => (
            <React.Fragment>
              <Text fontSize={16} fontWeight={900} lineHeight={1.25}>{field.title}</Text>
              <Text fontSize={13} lineHeight={1.54} color='#4a4a4a'>{field.description}</Text>
            </React.Fragment>
          )
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
  </Cell>
</Grid>
```
