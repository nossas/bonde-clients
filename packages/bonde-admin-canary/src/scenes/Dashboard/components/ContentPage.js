import React from 'react'
import PropTypes from 'prop-types'
import ContentPageComponent from './ContentPageComponent'

const ContentPage = ({ render, ...rest }) => (
  <ContentPageComponent {...rest}>
    {render}
  </ContentPageComponent>
)

ContentPage.propTypes = {
  backward: PropTypes.string,
  title: PropTypes.string,
  render: PropTypes.any,
  tabs: PropTypes.any,
  actions: PropTypes.any
}

export default ContentPage
