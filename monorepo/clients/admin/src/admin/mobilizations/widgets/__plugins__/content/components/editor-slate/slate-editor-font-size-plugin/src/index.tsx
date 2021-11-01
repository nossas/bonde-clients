// Rendering
import FontSizeInput from './FontSizeInput'
// Keyboard
import FontSizeKeyboardShortcut from './FontSizeKeyboardShortcut'
import FontSizeMark from './FontSizeMark'
// External
import * as FontSizeUtils from './FontSizeUtils'
// Validation
import ValidatePluginOptions from './ValidatePluginOptions'




const FontSizePlugin = options => {

  ValidatePluginOptions(options)

  return {
    onKeyDown(...arguments_) {
      return FontSizeKeyboardShortcut(...arguments_, options)
    }
  }
}

export {
  FontSizePlugin,
  FontSizeMark,
  FontSizeKeyboardShortcut,
  FontSizeUtils,
  FontSizeInput,
}
