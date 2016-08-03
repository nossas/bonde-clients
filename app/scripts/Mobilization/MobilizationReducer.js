import {
  REQUEST_FETCH_MOBILIZATIONS,
  SUCCESS_FETCH_MOBILIZATIONS,
  FAILURE_FETCH_MOBILIZATIONS
} from './MobilizationActions'

import {
  REQUEST_ADD_MOBILIZATION,
  SUCCESS_ADD_MOBILIZATION,
  FAILURE_ADD_MOBILIZATION
} from './MobilizationActions'

const initialState = {
  loading: false,
  loaded: false,
  data: [],
  // save mobilization
  saving: false,
}

const MobilizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_FETCH_MOBILIZATIONS:
      return {
        ...state,
        loading: true,
        loaded: false,
      }
    case SUCCESS_FETCH_MOBILIZATIONS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      }
    case FAILURE_FETCH_MOBILIZATIONS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.error
      }
    case REQUEST_ADD_MOBILIZATION:
      return {
        ...state,
        saving: true
      }
    case SUCCESS_ADD_MOBILIZATION:
    // Update list with new mobilization added
      return {
        ...state,
        saving: false,
        data: [action.result, ...state.data]
      }
    case FAILURE_ADD_MOBILIZATION:
      return {
        ...state,
        saving: false,
        error: action.error
      }
    default:
      return state
  }
}

export default MobilizationReducer



/*// State of module
mobilization = {  // Module name
  fetch: {  // state of fetch objects
    loading: false,
    loaded: true,
    data: [{ id: 1 }],
    error: undefined
  },
  edit: {  // state of new and edit object
    current: {}, // object editing actual
    saving: false,
    error: undefined,
  }
}

REQUEST_FETCH
SUCCESS_FETCH
FAILURE_FETCH

REQUEST_ADD
SUCCESS_ADD
FAILURE_ADD

EDIT_MOBILIZATION

{
  ...state,
  current: mobilization,
}


componentWillUpdate(props, nextProps) {
  if (props.params.id !== nextProps.params.id) {
    editMobilization(nextProps.params.id)
  }
}

const editMobilization = (mobilization) => {
  return {
    type: EDIT_MOBILIZATION,
    mobilization
  }
}

REQUEST_EDIT
SUCCESS_EDIT
FAILURE_EDIT


// Alternative
mobilization = {  // Module name
  loading: false,  // momento em que está fazendo fetch

  fetched: true,  // diz que já fez fetch uma vez

  lastFetched: new Date(),  // ultima data que foi carregado

  data: [{ id: 1 }],  // objetos carregados na aplicação

  error: undefined,  // erro de qualquer requisição

  saving: false,  // momento em que está fazendo salvando
}
*/
