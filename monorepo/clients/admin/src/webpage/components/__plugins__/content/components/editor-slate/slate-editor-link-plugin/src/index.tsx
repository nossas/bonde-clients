//
// Rendering
//
import LinkButton from './LinkButton'
//
// Keyboard
//
import LinkKeyboardShortcut from './LinkKeyboardShortcut'
import LinkNode from './LinkNode'
//
// External
//
import * as LinkUtils from './LinkUtils'




const LinkPlugin = options => ({
  onKeyDown(...arguments_) {
    return LinkKeyboardShortcut(...arguments_)
  },
})

export {
  LinkPlugin,
  LinkNode,
  LinkKeyboardShortcut,
  LinkUtils,
  LinkButton,
}
