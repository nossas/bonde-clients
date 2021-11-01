import PropTypes from 'prop-types'


function Content({ widget, update }) {
  return <div className='content'>
    {widget.settings.content}
  </div>
}

Content.propTypes = {
  widget: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired
}

export default Content
