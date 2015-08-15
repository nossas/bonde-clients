import { createFormReducer } from 'redux-form'

export { default as auth } from './auth';
export { default as mobilizations } from './mobilizations';
export { default as blocks } from './blocks';
export { default as widgets } from './widgets';
export const login = createFormReducer('login', ['email', 'password'])
