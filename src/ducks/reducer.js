import { createFormReducer } from 'redux-form'
import { combineReducers } from 'redux'
import mobilizations from './../../app/scripts/reducers/mobilizations'
import blocks from './../../app/scripts/reducers/blocks'
import widgets from './../../app/scripts/reducers/widgets'
import auth from './../../app/scripts/reducers/auth'

const mobilizationBasics = createFormReducer('mobilizationBasics', ['name', 'goal'])
const mobilizationCity = createFormReducer('mobilizationCity', ['colorScheme'])
const mobilizationAnalytics = createFormReducer('mobilizationAnalytics', ['id'])
const mobilizationFonts = createFormReducer('mobilizationFonts', ['headerFont', 'bodyFont'])
const loginForm = createFormReducer('loginForm', ['email', 'password'])
const widgetForm = createFormReducer('widgetForm', ['callToAction', 'buttonText', 'countText', 'emailText'])

export default combineReducers({
  mobilizations,
  mobilizationBasics,
  mobilizationCity,
  mobilizationAnalytics,
  mobilizationFonts,
  blocks,
  widgets,
  loginForm,
  widgetForm,
  auth
})
