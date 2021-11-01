

const styles = import('./kbd.scss')

function Kbd({ children }) {
  return <kbd className={styles.kbd}>
    {children}
  </kbd>
}

export default Kbd
