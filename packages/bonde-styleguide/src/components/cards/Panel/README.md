### Panel

```js
import { Panel } from '../../cards';

<Panel
  sectionTitle='Treending mobs'
  image='https://goo.gl/hggWmp'
  title='Cinzas dos Muros'
  description='Nossos muros têm voz, têm vida.'
  author='Por Minha Sampa'
/>
```

### Panel - `loading`
```js
import { Grid, Cell } from '../../layout';
import { Panel } from '../../cards';

<Grid>
  <Cell size={[4, 4, 4]}>
    <Panel
      loading
      sectionTitle=''
      image=''
      title=''
      description=''
      author=''
    />
  </Cell>
  <Cell size={[4, 4, 4]}>
    <Panel
      loading
      sectionTitle=''
      image=''
      title=''
      description=''
      author=''
    />
  </Cell>
  <Cell size={[4, 4, 4]}>
    <Panel
      loading
      sectionTitle=''
      image=''
      title=''
      description=''
      author=''
    />
  </Cell>
</Grid>
```
