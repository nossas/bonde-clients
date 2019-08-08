```js
import { Input } from '../';

<FormField
  label='Default'
  hint='Info/Hint'
  placeholder='Placeholder'
  inputComponent={Input}
/>
```


### FormField - `error`


```js
import { Input } from '../';

<FormField
  label='Error'
  hint='Info/Hint'
  placeholder='Invalid field'
  meta={{
    error:'Validation error'
  }}
  inputComponent={Input}
/>
```

### FormField - `valid`


```js
import { Input } from '../';

<FormField
  meta={{ valid: true }}
  label='Success'
  hint='Info/Hint'
  placeholder='Valid field'
  inputComponent={Input}
/>
```
