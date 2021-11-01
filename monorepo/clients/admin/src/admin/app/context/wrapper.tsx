import { useContext } from "react";
import AppContext from "./";

const Wrapper: React.FC<any> = (props) => {
  const { app } = useContext(AppContext)
  const { children, component: Component, ...properties } = props

  return (
    <Component {...properties} app={app}>
      {children}
    </Component>
  )
}

export default Wrapper
