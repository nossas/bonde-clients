import { Types } from '../rootReducer'

export const selectPage = (meta, blocks, widgets) => ({
  type: Types.SELECT_PAGE,
  payload: { meta, blocks, widgets }
})
