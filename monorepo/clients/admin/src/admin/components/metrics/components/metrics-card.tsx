
var styles = import('./metrics-card.scss')

const MetricsCard = ({
  children,
  backgroundColor,
  loading,
  dontLoad,
  title,
  footer,
  contentStyle
}) => (
  <div className={styles.container} style={{ backgroundColor }}>
    <div className={styles.header} style={{ position: 'relative' }}>{title}</div>
    <div className={styles.content} style={contentStyle}>
      {!loading && !dontLoad ? children : (
        <i className='fa fa-circle-o-notch fa-spin white' />
      )}
    </div>
    <div className={styles.footer}>
      {footer}
    </div>
  </div>
)

MetricsCard.defaultProps = {
  loading: true,
  dontLoad: false,
  contentStyle: {}
}

export default MetricsCard
