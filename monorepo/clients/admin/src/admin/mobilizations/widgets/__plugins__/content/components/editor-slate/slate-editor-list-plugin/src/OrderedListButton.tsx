import classnames from 'classnames'
import FontAwesome from 'react-fontawesome'
import { Button } from '../../slate-editor-components/src'
import { isOrderedList, orderedListStrategy } from './ListUtils'



function OrderedListButton({ value, onChange, className, style, type }) {
  return <Button
    style={style}
    type={type}
    onClick={e => onChange(orderedListStrategy(value.change(), 'ordered-list'))}
    className={classnames(
      'slate-list-plugin--button',
      { active: isOrderedList(value) },
      className,
    )}
  >
    <FontAwesome name="list-ol" />
  </Button>
}

export default OrderedListButton
