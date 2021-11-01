import PropTypes from 'prop-types'


const styles = import('./summary.scss')

function Summary({ value }) {
  return <div className={styles.summary}>
    <span className={styles.summaryHighlight}>{value}</span>
    <span>pessoas serão notificadas</span>
  </div>
}

Summary.propTypes = {
  value: PropTypes.number.isRequired
}

export default Summary
