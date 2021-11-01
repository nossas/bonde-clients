

const styles = import('./code.scss')

export default function ({ children, bordered }) {
  return <span className={bordered ? styles.bordered : styles.code}>
    {children}
  </span>
}
