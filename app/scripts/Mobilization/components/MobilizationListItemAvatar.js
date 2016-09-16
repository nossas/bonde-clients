import React, { PropTypes } from 'react'

const MobilizationListItemAvatar = ({ image, facebook_share_image }) => (
  <div className="list-item-avatar left pr3">
    {
      image || facebook_share_image ? (
        <div
          className="avatar-width avatar-height bg-cover bg-center overflow-hidden"
          style={{
            backgroundImage: `url(${image || facebook_share_image})`
          }}
        />
      ) : (
        <div className="avatar-width avatar-height bg-darken-2 table">
          <i className="fa fa-picture-o white table-cell align-middle center" />
        </div>
      )
    }
  </div>
)

MobilizationListItemAvatar.propTypes = {
  image: PropTypes.string,
  facebook_share_image: PropTypes.string
}

export default MobilizationListItemAvatar
