import { combineReducers } from 'redux'

import { reducer as filterableReducer } from '../../../components/FilterableSearchBar'
import { reducer as selectableReducer } from '../../../components/SelectableList'

import templatesReducer from './reducers'

export default {
  reducers: combineReducers(
    {
      list: templatesReducer,
      filterable: filterableReducer,
      selectable: selectableReducer
    }
  ),
}
