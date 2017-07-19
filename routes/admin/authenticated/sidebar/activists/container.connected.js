import React from 'react'
import { connect } from 'react-redux'

import Container from './container'
import data from './data'

const mapStateToProps = (state, props) => ({
  data
})

export default connect(mapStateToProps)(Container)

