
import { cloneElement } from './clone-element'

function Form({ children, handleSubmit, pristine, submitting }) {
  return (
    <form onSubmit={handleSubmit}>
      {children && cloneElement(children, { pristine, submitting })}
    </form>
  )
}

export default Form
