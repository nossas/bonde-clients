import * as t from '~client/subscriptions/redux/action-types'

export const initialState = {
  //
  // Store the modification type that the user wants to do in the subscription like,
  // change the credit card data or, the recurring date of charging.
  // @type String
  //
  modificationType: undefined,
  //
  // Store the stack of form components to be rendered with
  // transition animation using CSSTransitionGroup.
  // @type Array -> PropTypes.element
  //
  animationStack: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case t.SET_MODIFICATION_TYPE:
      return { ...state, modificationType: action.payload }

    case t.APPEND_ANIMATION_STACK:
      return {
        ...state,
        animationStack: [...state.animationStack, action.payload]
      }
    case t.REMOVE_ANIMATION_STACK:
      const index = action.payload
      return {
        ...state,
        animationStack: [
          ...state.animationStack.slice(0, index),
          ...state.animationStack.slice(index + 1)
        ]
      }
    default:
      return state
  }
}

