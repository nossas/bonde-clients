import classnames from 'classnames'
import FontAwesome from 'react-fontawesome'
import { Button } from '../../slate-editor-components/src'
import { hasMark, strikethroughMarkStrategy } from './StrikethroughUtils'



function StrikethroughButton({ value, onChange, changeState, className, style, type }) {
  return <Button
    style={style}
    type={type}
    onClick={e => onChange(strikethroughMarkStrategy(value.change()))}
    className={classnames(
      'slate-strikethrough-plugin--button',
      { active: hasMark(value) },
      className,
    )}
  >
    <FontAwesome name="strikethrough" />
  </Button>
}

export default StrikethroughButton
