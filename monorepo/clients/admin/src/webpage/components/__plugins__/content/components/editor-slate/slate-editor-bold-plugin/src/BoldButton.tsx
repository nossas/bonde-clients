import classnames from 'classnames'
import FontAwesome from 'react-fontawesome'
import { Button } from '../../slate-editor-components/src'
import { boldMarkStrategy, hasMark } from './BoldUtils'




function BoldButton({ value, onChange, changeState, className, style, type }) {
  return <Button
    style={style}
    type={type}
    onClick={e => onChange(boldMarkStrategy(value.change()))}
    className={classnames(
      'slate-bold-plugin--button',
      { active: hasMark(value) },
      className,
    )}
  >
    <FontAwesome name="bold" />
  </Button>
}

export default BoldButton
