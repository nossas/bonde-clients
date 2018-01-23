import { Types } from '../rootReducer'

export const load = (meta, blocks, widgets) => ({
  type: Types.LOAD,
  payload: { meta, blocks, widgets }
})
