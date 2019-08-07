```js
import { Loading } from '../../await';

<Loading />
```


### Loading - `color`


```js
import { Loading } from '../../await';

<div>
  <Loading color='#00C08A' />
  <Loading color='#FFD500' />
  <Loading color='#40B4E5' />
  <Loading color='#DD2295' />
</div>
```


### Loading - `size`


```js
import { Loading } from '../../await';

<div>
  <Loading size={120} />
  <Loading size={80} />
  <Loading size={50} />
  <Loading size={30} />
</div>
```


### Loading - modify sparkles props


```js
import { Loading } from '../../await';

<Loading
  size={80}
  sparklesColorInit='black'
  sparklesColor='#FFD500'
  sparklesDuration='800ms'
/>
```
