import { combineReducers } from 'redux'

import blocksReducer from './blocks'
import widgetsReducer from './widgets'
import editionReducer from './edition'
import hoverReducer from './hover'
import uploaderReducer from './uploaderReducer'

export default combineReducers({
  blocks: blocksReducer,
  widgets: widgetsReducer,
  edition: editionReducer,
  hover: hoverReducer,
  uploader: uploaderReducer
})
