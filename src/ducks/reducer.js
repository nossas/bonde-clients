import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form';

import colorPicker from '../../app/components/ColorPicker/ColorPickerReducer'
//
// FIXME: Widgets reducer in app/modules/widgets/reducers
//
import widgets from '../../app/scripts/Widget/reducer'
import matches from '../../app/scripts/Widget/plugins/Match/reducer'
import mobilization from '../../app/scripts/Mobilization/MobilizationReducer'
import mobilizationTemplates from '../../app/scripts/Mobilization/plugins/Templates/MobilizationTemplatesReducer'
import selectableList from '../../app/components/SelectableList/SelectableListReducer'
import filterableSearchBar from '../../app/components/FilterableSearchBar/FilterableSearchBarReducer'

import { reducers as blocks } from '../../app/modules/mobilizations/blocks'
import { reducers as auth } from '../../app/scripts/Account'
import { reducers as community } from '../../app/scripts/Community'
import { reducers as widgetsReducer } from '../../app/modules/widgets'

export default combineReducers({
  form: formReducer,

  // Need some refact
  mobilization,
  mobilizationTemplates,
  selectableList,
  filterableSearchBar,
  colorPicker,
  widgets,
  widgetsReducer,
  matches,

  blocks,
  auth,
  community,
})
