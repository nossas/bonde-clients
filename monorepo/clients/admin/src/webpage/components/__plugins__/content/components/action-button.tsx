import classnames from 'classnames'

function ActionButton({ children, editing, changeState, onClick, title, style, className, value }) {
  return <button
    className={classnames('btn bg-blacker rounded', className)}
    onClick={() => onClick(value, changeState)}
    style={{
      position: 'relative',
      display: editing ? 'inline-block' : 'none',
      ...style
    }}
    title={title}
  >
    {children}
  </button>
}

export default ActionButton