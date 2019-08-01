```js
import { Grid, Cell, Flexbox } from '../../layout';
import { Input, InputAdornment, ControlLabel } from '../';

<Grid>
  <Cell size={[6, 6]}>
    <ControlLabel>Invalid</ControlLabel>
    <Flexbox horizontal>
      <Input fullWidth invalid placeholder='Placeholder' />
      <InputAdornment invalid />
    </Flexbox>
  </Cell>
  <Cell size={[6, 6]}>
    <ControlLabel>Valid</ControlLabel>
    <Flexbox horizontal>
      <Input fullWidth valid placeholder='Placeholder' />
      <InputAdornment valid />
    </Flexbox>
  </Cell>
</Grid>
```
