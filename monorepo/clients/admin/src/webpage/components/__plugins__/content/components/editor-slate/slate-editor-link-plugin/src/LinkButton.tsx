import classnames from 'classnames'
import FontAwesome from 'react-fontawesome'
import { Button } from '../../slate-editor-components/src'
import { hasLinks, insertLinkStrategy } from './LinkUtils'



function LinkButton({ value, onChange, className, style, type }) {
  return <Button
    style={style}
    type={type}
    onMouseDown={e => onChange(insertLinkStrategy(value.change()))}
    className={classnames(
      'slate-link-plugin--button',
      { active: hasLinks(value) },
      className,
    )}
  >
    <FontAwesome name="link" />
  </Button>
}

export default LinkButton
