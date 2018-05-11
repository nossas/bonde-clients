```js
<FormField
  label='Default'
  hint='Info/Hint'
  placeholder='Placeholder'
  inputComponent={Input}
/>
```


### FormField - `error`


```js
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
<FormField
  meta={{ valid: true }}
  label='Success'
  hint='Info/Hint'
  placeholder='Valid field'
  inputComponent={Input}
/>
```
