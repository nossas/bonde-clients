//
// Rendering
//
import BoldButton from './BoldButton'
//
// Keyboard
//
import BoldKeyboardShortcut from './BoldKeyboardShortcut'
import BoldMark from './BoldMark'
//
// External
//
import * as BoldUtils from './BoldUtils'

const BoldPlugin = options => ({
  onKeyDown(...arguments_) {
    return BoldKeyboardShortcut(...arguments_)
  },
})

export {
  BoldPlugin,
  BoldMark,
  BoldKeyboardShortcut,
  BoldUtils,
  BoldButton,
}
