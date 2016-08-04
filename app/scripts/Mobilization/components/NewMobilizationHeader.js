import React, { PropTypes } from 'react'
import classnames from 'classnames'


const NewMobilizationHeader = ({ location }) => {
  const nameProps = {
    className: 'inline-block py3 mr3 border-bottom',
  }
  const cityProps = {
    className: 'inline-block muted'
  }

  const re = /\/\w+\/[0-9]+\/cityNew/
  if (location && re.test(location.pathname)) {
    cityProps.className = 'inline-block py3 mr3 border-bottom'
    cityProps.style = { borderWidth: '3px' }
    nameProps.className = 'inline-block mr3 muted'
  }

  return (
    <h2 className="bg-white px4 m0 clearfix" style={{paddingTop: '2rem'}}>
      <span className="col col-4 mt0">Nova mobilização</span>
      <ul className="list-reset m0 col col-8" style={{marginTop: '-25px'}}>
        <li {...nameProps} style={{borderWidth:'3px'}}>1. Nome e objetivo</li>
        <li {...cityProps}>2. Cidade</li>
      </ul>
    </h2>
  )
}

NewMobilizationHeader.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
}

export default NewMobilizationHeader
