import PropTypes from 'prop-types'
import './styles.scss'



function ButtonPreview({ text, onClick }) {
  return <div className='button-preview flex flex-wrap' onClick={onClick}>
    <div className='circle bg-pagenta'>
      <i className='fa fa-plus' />
    </div>
    <p>{text}</p>
  </div>
}

ButtonPreview.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

export default ButtonPreview
