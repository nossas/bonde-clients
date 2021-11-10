

// FIXME: Needs to handle assets files to work with SSR
import('./ModalButton.css')

function Container({ children }) {
  return <div className="modal-button--container">
    {children}
  </div>
}

function Primary({ text, type = 'button', onClick }) {
  return <button
    type={type}
    className="primary"
    onClick={onClick}
  >
    {text}
  </button>
}

function Opaque({ text, type = 'button', onClick }) {
  return <button
    type={type}
    className="opaque"
    onClick={onClick}
  >
    {text}
  </button>
}

function Danger({ text, type = 'button', onClick }) {
  return <button
    type={type}
    className="danger"
    onClick={onClick}
  >
    {text}
  </button>
}

export default {
  Container,
  Primary,
  Opaque,
  Danger
}
