import { createFormReducer } from 'redux-form'

export { default as auth } from './auth';
export { default as mobilizations } from './mobilizations';
export { default as blocks } from './blocks';
export { default as widgets } from './widgets';

export const loginForm = createFormReducer('loginForm', ['email', 'password'])
export const mobilizationFonts = createFormReducer('mobilizationFonts', ['headerFont', 'bodyFont'])
export const mobilizationBasics = createFormReducer('mobilizationBasics', ['name', 'goal'])
export const mobilizationCity = createFormReducer('mobilizationCity', ['colorScheme'])
export const mobilizationAnalytics = createFormReducer('mobilizationAnalytics', ['id'])
export const mobilizationSharing = createFormReducer('mobilizationSharing', ['facebook_share_title', 'facebook_share_description'])
export const widgetForm = createFormReducer('widgetForm', ['callToAction', 'buttonText', 'countText', 'emailText'])
