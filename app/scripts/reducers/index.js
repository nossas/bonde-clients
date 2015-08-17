import { createFormReducer } from 'redux-form'

export { default as auth } from './auth';
export { default as mobilizations } from './mobilizations';
export { default as blocks } from './blocks';
export { default as widgets } from './widgets';
export const login = createFormReducer('login', ['email', 'password'])
export const mobilizationBasics = createFormReducer('mobilizationBasics', ['name', 'goal'])
export const mobilizationCity = createFormReducer('mobilizationCity', ['color_scheme'])
export const mobilizationAnalytics = createFormReducer('mobilizationAnalytics', ['id'])
