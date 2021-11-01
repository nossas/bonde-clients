
import FormGroup from '../formGroup'
import { inputStyle } from './styles'

function Input({ id, type, value, onChange, placeholder }) {
  return <input
    id={id}
    style={inputStyle}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
}

export default FormGroup(Input)
