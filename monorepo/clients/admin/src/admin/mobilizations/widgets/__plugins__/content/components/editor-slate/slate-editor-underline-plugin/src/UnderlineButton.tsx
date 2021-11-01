import classnames from 'classnames'
import FontAwesome from 'react-fontawesome'
import { Button } from '../../slate-editor-components/src'
import { hasMark, underlineMarkStrategy } from './UnderlineUtils'



function UnderlineButton({ value, onChange, changeState, className, style, type }) {
  return <Button
    style={style}
    type={type}
    onClick={e => onChange(underlineMarkStrategy(value.change()))}
    className={classnames(
      'slate-underline-plugin--button',
      { active: hasMark(value) },
      className
    )}
  >
    <FontAwesome name="underline" />
  </Button>
}

export default UnderlineButton
