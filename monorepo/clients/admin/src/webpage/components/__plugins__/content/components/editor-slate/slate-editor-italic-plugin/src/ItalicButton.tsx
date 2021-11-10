import classnames from 'classnames'
import FontAwesome from 'react-fontawesome'
import { Button } from '../../slate-editor-components/src'
import { hasMark, italicMarkStrategy } from './ItalicUtils'



function ItalicButton({ value, onChange, className, style, type }) {
  return <Button
    style={style}
    type={type}
    onClick={e => onChange(italicMarkStrategy(value.change()))}
    className={classnames(
      'slate-italic-plugin--button',
      { active: hasMark(value) },
      className,
    )}
  >
    <FontAwesome name="italic" />
  </Button>
}

export default ItalicButton
