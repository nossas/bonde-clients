import PropTypes from 'prop-types'
import React from 'react'
import uuid from 'uuid'

var styles = require('exenv').canUseDOM ? require('./preview.scss') : {}

const genderIconMap = {
  male: `mars ${styles.blue}`,
  female: `venus ${styles.pink}`
}

const Preview = ({ list, total }) => (
  <div className={styles.previewContainer}>
    <h1 className={styles.previewTitle}>
      Preview
      <p className={styles.previewTitleHelper}>
        Exibindo {list.length} de {total}
      </p>
    </h1>
    <ul className={styles.previewList}>
      {list.map(activist => (
        <li key={uuid()} className={styles.previewListItem}>
          <div
            className={styles.previewListItemAvatar}
            style={{ backgroundImage: `url('${activist.profile_pic}')` }}
          />
          <div className={styles.previewListItemGender}>
            <i className={`fa fa-${genderIconMap[activist.gender]}`} />
          </div>
          <div className={styles.previewListItemName}>
            {activist.first_name} {activist.last_name}
          </div>
        </li>
      ))}
    </ul>
  </div>
)

Preview.propTypes = {
  list: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired
}

export default Preview
