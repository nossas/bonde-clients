### Button - Default

```js
import { Button } from '../';

<Button onClick={() => alert('Button: onClick')}>
  Button
</Button>
```

### Button - `dark`

```js { "props": { "className": "dark" } }
import { Button } from '../';

<Button
  onClick={() => alert('Button: onClick')}
  dark
>
  Button
</Button>
```

### Button - `light`
```js { "props": { "className": "transparent" } }
import { Button } from '../';

<Button
  onClick={() => alert('Button: onClick')}
  light
>
  Button
</Button>
```

### Button - `flat`
```js
import { Button } from '../';

<Button
  onClick={() => alert('Button: onClick')}
  flat
>
  Flat
</Button>
```

### Button - `disabled`
```js
import { Button } from '../';

<Button disabled>Button</Button>
```
