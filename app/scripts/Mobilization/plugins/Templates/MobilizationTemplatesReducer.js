import * as templates from './mock-templates'

export const initialState = {
  loading: false,
  loaded: true,
  global: templates.global,
  custom: templates.custom
}

const MobilizationTemplatesReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default MobilizationTemplatesReducer
