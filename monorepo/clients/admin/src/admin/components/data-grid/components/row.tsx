
import classnames from 'classnames'
import { RowHOC } from '../hocs'

function ClickableRow({ children, className, onSelectRow }) {
  return <div
    className={classnames(
      className,
      'row clickable'
    )}
    onClick={onSelectRow}
  >
    {children}
  </div>
}

export default RowHOC(ClickableRow)
