import * as React from 'react'
import Application from './Application'

export type DiagramContextType = {
  app: Application,
  transferKey: string,
  eventListener(action: string): void
};

const DiagramContext = React.createContext<Partial<DiagramContextType>>({})

export const DiagramProvider = DiagramContext.Provider
export const DiagramConsumer = DiagramContext.Consumer

export default DiagramContext