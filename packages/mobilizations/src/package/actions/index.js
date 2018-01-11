import { createNamedWrapperAction as createAction } from './createAction'
import { load } from '../ducks/listable'

export const loadMobilizations = createAction(load, 'mobilizations')

export const loadWidgets = createAction(load, 'widgets')
