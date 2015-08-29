import { createFormReducer } from 'redux-form'
import { combineReducers } from 'redux';
import mobilizations from './../../app/scripts/reducers/mobilizations'
import blocks from './../../app/scripts/reducers/blocks'
import widgets from './../../app/scripts/reducers/widgets'

const mobilizationBasics = createFormReducer('mobilizationBasics', ['name', 'goal'])
const mobilizationCity = createFormReducer('mobilizationCity', ['colorScheme'])
const mobilizationAnalytics = createFormReducer('mobilizationAnalytics', ['id'])

export default combineReducers({
  mobilizations,
  mobilizationBasics,
  mobilizationCity,
  mobilizationAnalytics,
  blocks,
  widgets
});
