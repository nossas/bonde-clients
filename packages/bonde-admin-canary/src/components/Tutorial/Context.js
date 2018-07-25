import React from 'react'

export const defaultContext = {
  currentStep: 0,
  steps: []
}

export default React.createContext(defaultContext)
