
import { ColHOC } from '../hocs'

function Checkbox({ onChange, checked, ...colProperties }) {
  return <div {...colProperties}>
    <input type='checkbox' checked={checked} onChange={onChange} />
  </div>
}

export default ColHOC(Checkbox)
