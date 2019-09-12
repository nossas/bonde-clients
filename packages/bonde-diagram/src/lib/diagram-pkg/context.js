import React from 'react'

const DiagramContext = React.createContext({})

export const DiagramProvider = DiagramContext.Provider
export const DiagramConsumer = DiagramContext.Consumer

export default DiagramContext