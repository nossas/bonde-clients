import { createFormReducer } from 'redux-form'
import { combineReducers } from 'redux';
import mobilizations from './../../app/scripts/reducers/mobilizations'

const mobilizationBasics = createFormReducer('mobilizationBasics', ['name', 'goal'])

export default combineReducers({
  mobilizations,
  mobilizationBasics
});
