import React, { Component, PropTypes } from 'react'


class EditUserPage extends Component {

  render() {
    const { auth } = this.props
    return (
      <div>
        <span>Se fudeu!</span>
      </div>
    )
  }
}

EditUserPage.propTypes = {
  // Injected by RequireLogin.js
  auth: PropTypes.object.isRequired,
}

export default EditUserPage
