

// FIXME: Needs to handle assets files to work with SSR
import('./Tooltip.css')

function Tooltip({ children, className, ...properties }) {
  return <div
    {...properties}
    className="tooltip--container"
    contentEditable={false}
  >
    {children}
  </div>
}

Tooltip.Item = function ({ children, ...properties }) {
  return <div {...properties} className="tooltip--item">
    {children}
  </div>
}

export default Tooltip
