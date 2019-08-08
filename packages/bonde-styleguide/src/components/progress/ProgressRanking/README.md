### ProgressRanking - Default


The `ProgressRanking` component sorts the child items ascendantly by default.

```js
import { IconColorful } from '../../content';
import { ProgressRanking, ProgressRankingItem } from '../';

<ProgressRanking>
  <ProgressRankingItem value={1602} label='Somos toda Olga' />
  <ProgressRankingItem value={2450} label='Existe Amor em SP' />
</ProgressRanking>
```


### ProgressRanking - `color`


```js
import { ProgressRanking, ProgressRankingItem } from '../';

<ProgressRanking color='#C70038'>
  <ProgressRankingItem value={1602} label='Somos toda Olga' />
  <ProgressRankingItem value={2450} label='Existe Amor em SP' />
</ProgressRanking>
```


### ProgressRanking - `nosort`

```js
import { ProgressRanking, ProgressRankingItem } from '../';

<ProgressRanking nosort>
  <ProgressRankingItem value={610} label='Sem FiuFiu' />
  <ProgressRankingItem value={1602} label='Somos toda Olga' />
  <ProgressRankingItem value={2450} label='Existe Amor em SP' />
  <ProgressRankingItem value={901} label='Empodera!' />
  <ProgressRankingItem value={967} label='Respeita as Mina' />
</ProgressRanking>
```


### ProgressRanking - `maxValue`


```js
import { ProgressRanking, ProgressRankingItem } from '../';

<ProgressRanking maxValue={5000}>
  <ProgressRankingItem value={1602} label='Somos toda Olga' />
  <ProgressRankingItem value={2450} label='Existe Amor em SP' />
</ProgressRanking>
```
