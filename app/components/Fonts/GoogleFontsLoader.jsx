import React, { PropTypes } from 'react'

import { getGoogleFontsLoadURL } from '../../util/font-name-handler'

const GoogleFontsLoader = ({ fonts }) => (
  <link href={getGoogleFontsLoadURL(fonts)} rel="stylesheet" />
)

GoogleFontsLoader.propTypes = {
  fonts: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired
}

export default GoogleFontsLoader