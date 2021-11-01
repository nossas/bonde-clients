
import FormGroup from '../formGroup'
import { selectStyle } from './styles'

function Select({ i18n, children, value, onChange }) {
  return <select style={selectStyle} value={value} onChange={onChange}>
    {children && children.map(child => React.cloneElement(child, { i18n }))}
  </select>
}

export function Option({ value, i18n, label }) {
  return <option value={value}>
    {i18n(label) || value}
  </option>
}

export default FormGroup(Select)
