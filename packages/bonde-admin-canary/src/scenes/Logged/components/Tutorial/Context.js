import React from 'react'

export const defaultContext = {
  currentStep: 0,
  steps: {},
  total: 0
}

export default React.createContext(defaultContext)
