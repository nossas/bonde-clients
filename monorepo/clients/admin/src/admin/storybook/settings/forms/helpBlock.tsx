

function HelpBlock({ children, level }) {
  return <small
    style={{
      color: (
        level === 'error' ? 'red'
          : (level === 'success' ? 'green'
            : '#c7c7c7')
      )
    }}
  >
    <dfn>{children}</dfn>
  </small>
}

export default HelpBlock
