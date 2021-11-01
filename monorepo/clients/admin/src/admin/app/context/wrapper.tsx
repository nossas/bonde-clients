
import ApplicationContextTypes from './types'

const Wrapper: React.FC = () => {
  const { children, component: Component, ...properties } = this.props
  const { app } = this.context
  return (
    <Component {...properties} app={app}>
      {children}
    </Component>
  )
}

Wrapper.contextTypes = ApplicationContextTypes

export default Wrapper
