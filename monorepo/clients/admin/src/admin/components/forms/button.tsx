

function Button({ children, type, className, pristine, submitting }) {
  return <button
    type={type}
    className={className}
    disabled={type === 'submit' ? pristine || submitting : false}
  >
    {children}
  </button>
}

Button.defaultProps = {
  type: 'button'
}

export default Button
