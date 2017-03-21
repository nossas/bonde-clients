import React, { PropTypes } from 'react'

import { TellAFriend } from '~components/share'

const PressureTellAFriend = ({ preview, mobilization }) => (
  <TellAFriend
    preview={preview}
    mobilization={mobilization}
    message='Pressão enviada'
  />
)

PressureTellAFriend.propTypes = {
  preview: PropTypes.bool,
  mobilization: PropTypes.object.isRequired
}

export default PressureTellAFriend
