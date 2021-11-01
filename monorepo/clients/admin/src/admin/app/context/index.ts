import React from "react";

export interface ApplicationContextTypes {
  app: {
    signing?: boolean
    signed?: boolean
    token?: string
  }
}

const AppContext = React.createContext<ApplicationContextTypes>({
  app: {}
})

export default AppContext