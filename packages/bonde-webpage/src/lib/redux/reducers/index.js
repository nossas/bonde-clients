import { combineReducers } from 'redux'

import blocksReducer from './blocks'
import widgetsReducer from './widgets'
import editionReducer from './edition'
import hoverReducer from './hover'
import uploaderReducer from './uploader'
import mobilizationsReducer from './mobilizations'
import dataExportReducer from './data-export'

export default combineReducers({
  list: mobilizationsReducer,
  blocks: blocksReducer,
  widgets: widgetsReducer,
  edition: editionReducer,
  hover: hoverReducer,
  uploader: uploaderReducer
})
