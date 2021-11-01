//
// Rendering
//
import StrikethroughButton from './StrikethroughButton'
//
// Keyboard
//
import StrikethroughKeyboardShortcut from './StrikethroughKeyboardShortcut'
import StrikethroughMark from './StrikethroughMark'
//
// External
//
import * as StrikethroughUtils from './StrikethroughUtils'

const StrikethroughPlugin = options => ({
  onKeyDown(...arguments_) {
    return StrikethroughKeyboardShortcut(...arguments_)
  },
})

export {
  StrikethroughPlugin,
  StrikethroughMark,
  StrikethroughKeyboardShortcut,
  StrikethroughUtils,
  StrikethroughButton,
}
