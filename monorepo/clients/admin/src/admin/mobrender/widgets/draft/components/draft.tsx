
import { injectIntl, intlShape } from 'react-intl'
import widgets from '../../../../mobrender/widgets/config'
import DraftButton from './draft-button'

import('./draft.scss')

const Draft = ({ mobilization, widget, update, intl, ...extraProps }) => {
  const updateKind = props => update({ ...widget, ...props })
  const widgetsConfig = widgets(mobilization, widget, { intl }).filter(w => w.kind !== 'draft')

  return (
    <div className='draft-widget widget center rounded lightgray clearfix'>
      {widgetsConfig.map((wc, index) => {
        const props = Object.assign({}, wc)
        delete props.component
        return (
          <DraftButton
            key={`wc-${index}`}
            widget={widget}
            updateKind={updateKind}
            {...props}
          />
        )
      })}
    </div>
  )
}

Draft.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(Draft)
