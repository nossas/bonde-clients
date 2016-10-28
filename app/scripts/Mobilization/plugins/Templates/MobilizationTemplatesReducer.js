import * as templates from './mock-templates'

import {
  REQUEST_TEMPLATE_CREATE,
  SUCCESS_TEMPLATE_CREATE,
  FAILURE_TEMPLATE_CREATE
} from './MobilizationTemplatesActions'

export const initialState = {
  loading: false,
  loaded: false,
  global: [],
  custom: []
}

const MobilizationTemplatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_TEMPLATE_CREATE:
      return { ...state, loading: true }
    case SUCCESS_TEMPLATE_CREATE:
      if (action.template.global) state.global.push(action.template)
      else state.custom.push(action.template)

      return { ...state, loading: false, loaded: true }
    case FAILURE_TEMPLATE_CREATE:
      return { ...state, loading: false, error: action.error }
    default:
      return state
  }
}

export default MobilizationTemplatesReducer
