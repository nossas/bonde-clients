
import { ColHOC } from '../hocs'

function Linkable({ children, onClick, ...colProperties }) {
  return <div {...colProperties}>
    <a
      href='#'
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </a>
  </div>
}

export default ColHOC(Linkable)
