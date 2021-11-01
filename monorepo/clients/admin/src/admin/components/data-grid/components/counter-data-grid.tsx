
import { DataGridHOC } from '../hocs'
import Row from './row'

function Counter({
  children,
  data,
  totalCount,
  counterText,
  ...dataGridProperties
}) {
  return <div {...dataGridProperties}>
    <h2>
      {totalCount || data.length} {counterText || 'itens'}
    </h2>
    {children}
  </div>
}

export default DataGridHOC({ rowComponent: Row })(Counter)
