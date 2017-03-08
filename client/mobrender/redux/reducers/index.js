import { combineReducers } from 'redux'

import blocksReducer from './blocks'
import widgetsReducer from './widgets'
import editionReducer from './edition'
import hoverReducer from './hover'
import uploaderReducer from './uploader'
import mobilizationsReducer from './mobilizations'
// TODO: Move reducer to mobrender module
import templatesReducer from '~client/mobilizations/templates/reducers'
import pluginsReducer from '~client/mobilizations/widgets/__plugins__/reducers'
import dataExportReducer from '~client/mobilizations/widgets/reducers/data-export'

export default combineReducers({
  list: mobilizationsReducer,
  blocks: blocksReducer,
  templates: templatesReducer,
  widgets: widgetsReducer,
  edition: editionReducer,
  hover: hoverReducer,
  uploader: uploaderReducer,
  plugins: pluginsReducer,
  dataExport: dataExportReducer
})
