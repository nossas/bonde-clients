import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import moment from 'moment'

const MobilizationListItem = ({ mobilization, redirectToEdit }) => {
  console.log(mobilization)

  return !mobilization ? null : (
    <div>

      <Link
        className="mobilization-list-item bg-white gray20 block clearfix hover"
        to={typeof redirectToEdit === 'function' ? redirectToEdit(mobilization.id) : ''}
      >
        {/* MobilizationListItemAvatar */}
        <div className="list-item-avatar left pr3">
          {
            mobilization.image || mobilization.facebook_share_image ? (
              <div
                className="avatar-width avatar-height bg-cover bg-center overflow-hidden"
                style={{
                  backgroundImage: `url(${mobilization.image || mobilization.facebook_share_image})`
                }}
              />
            ) : (
              <div className="avatar-width avatar-height bg-darken-2 table">
                <i className="fa fa-picture-o white table-cell align-middle center" />
              </div>
            )
          }
        </div>
        <i className="list-item-more fa fa-ellipsis-h right pr3" />

        <div className="list-item-table-container overflow-hidden">
          {/* MobilizationListItemName */}
          <div className="list-item-name px3 col col-4">
            <div className="table">
              <div className="table-cell align-middle">
                <b className="block mb1">
                  {
                    mobilization.name.length <= 50 ?
                    mobilization.name :
                    `${mobilization.name.substring(0, 50).trim()}...`
                  }
                </b>
                <span>
                  {
                    mobilization.goal.length <= 50 ?
                    mobilization.goal :
                    `${mobilization.goal.substring(0, 50).trim()}...`
                  }
                </span>
              </div>
            </div>
          </div>

          <div className="list-item-created-at px3 col col-2">
            {moment(mobilization.created_at).format('DD/MM/YYYY')}
          </div>
          <div className="list-item-users px3 col col-2">
            {mobilization.users_count || '-'}
          </div>
          <div className="list-item-fund-raising px3 col col-2">
            R$ {mobilization.total_fund_raising || '-'}
          </div>
        </div>
      </Link>
    </div>
  )
}

MobilizationListItem.propTypes = {
  mobilization: PropTypes.object.isRequired
}

export default MobilizationListItem
