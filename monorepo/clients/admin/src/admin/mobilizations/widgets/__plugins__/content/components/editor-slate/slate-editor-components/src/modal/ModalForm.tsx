import classnames from 'classnames'


// FIXME: Needs to handle assets files to work with SSR
import('./ModalForm.css')

function ModalForm({ children, className, ...properties }) {
  return <form
    className={classnames('modal--form', className)}
    {...properties}
  >
    {children}
  </form>
}

ModalForm.Group = function ({ children, className, ...properties }) {
  return <div
    className={classnames('modal--form-group', className)}
    {...properties}
  >
    {children}
  </div>
}

ModalForm.LabelHelper = function ({ children, className, ...properties }) {
  return <span
    className={classnames('modal--form-label-helper', className)}
    {...properties}
  >
    {children}
  </span>
}

export default ModalForm
