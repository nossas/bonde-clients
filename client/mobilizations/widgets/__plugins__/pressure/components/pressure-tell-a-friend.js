import React, { PropTypes } from 'react'

import { TellAFriend } from '~components/share'

const PressureTellAFriend = ({ mobilization }) => (
  <TellAFriend
    mobilization={mobilization}
    message='Pressão enviada'
    href={process.env.BROWSER ? window.location.origin : ''}
  />
)

PressureTellAFriend.propTypes = {
  mobilization: PropTypes.object.isRequired
}

export default PressureTellAFriend
