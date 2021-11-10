
import { typeCheck } from '../../../slate-editor-utils/src'

function Button({ children, id, onClick, className, style, type, ...properties }) {
  return <button
    id={id}
    style={style}
    type={type}
    onClick={(e) => typeCheck.isFunction(onClick) && onClick(e)}
    className={className}
    {...properties}
  >
    {children}
  </button>
}

Button.defaultProps = {
  type: 'button'
}

export default Button
