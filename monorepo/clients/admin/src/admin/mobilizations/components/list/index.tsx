import PropTypes from 'prop-types'


function List({ children }) {
  return <div className='list gray20 content-box'>
    {children}
  </div>
}

List.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired
}

export default List
