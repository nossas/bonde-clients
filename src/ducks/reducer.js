import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import colorPicker from '../../app/components/ColorPicker/ColorPickerReducer'
import mobilizationTemplates from '../../app/scripts/Mobilization/plugins/Templates/MobilizationTemplatesReducer'
import selectableList from '../../app/components/SelectableList/SelectableListReducer'
import filterableSearchBar from '../../app/components/FilterableSearchBar/FilterableSearchBarReducer'

import { reducers as mobilization } from '../../app/modules/mobilizations'
import { reducers as blocks } from '../../app/modules/mobilizations/blocks'
import { reducers as auth } from '../../app/scripts/Account'
import { reducers as community } from '../../app/scripts/Community'
import { reducers as widgets } from '../../app/modules/widgets'

export default combineReducers({
  form,

  blocks,
  auth,
  community,
  widgets,

  // Need some refact
  mobilization,
  mobilizationTemplates,
  selectableList,
  filterableSearchBar,
  colorPicker
})
