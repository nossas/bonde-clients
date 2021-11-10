import classnames from 'classnames'
import FontAwesome from 'react-fontawesome'
import { Button } from '../../slate-editor-components/src'
import { appendEmbed, hasEmbed } from './EmbedUtils'



function EmbedButton({ value, onChange, changeState, className, style, type }) {
  return <Button
    style={style}
    type={type}
    onClick={e => {
      const embed = window.prompt('Enter the embed that you want to add.')
      if (embed) {
        onChange(appendEmbed(value.change(), embed))
      }
    }}
    className={classnames(
      'slate-embed-plugin--button',
      { active: hasEmbed(value) },
      className
    )}
  >
    <FontAwesome name="code" />
  </Button>
}

export default EmbedButton
